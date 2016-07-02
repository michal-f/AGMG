<?php

/*namespace PHPImageWorkshop;

use PHPImageWorkshop\Core\ImageWorkshopLayer as ImageWorkshopLayer;
use PHPImageWorkshop\Core\ImageWorkshopLib as ImageWorkshopLib;
use PHPImageWorkshop\Exception\ImageWorkshopException as ImageWorkshopException;
*/

// If no autoloader, uncomment these lines:
require_once(GG_DIR . '/classes/PHPImageWorkshop/src/Core/ImageWorkshopLayer.php');
require_once(GG_DIR . '/classes/PHPImageWorkshop/src/Exception/ImageWorkshopException.php');

/**
 * ImageWorkshop class
 * 
 * Use this class as a factory to initialize ImageWorkshop layers
 *
 * @version 2.0.5
 * @link http://phpimageworkshop.com
 * @author Sybio (Clément Guillemain / @Sybio01)
 * @license http://en.wikipedia.org/wiki/MIT_License
 * @copyright Clément Guillemain
 */
class ImageWorkshop
{
    /**
     * @var integer
     */
    const ERROR_NOT_AN_IMAGE_FILE = 1;
    
    /**
     * @var integer
     */
    const ERROR_IMAGE_NOT_FOUND = 2;
    
    /**
     * @var integer
     */
    const ERROR_NOT_WRITABLE_FILE = 3;
    
    /**
     * @var integer
     */
    const ERROR_CREATE_IMAGE_FROM_STRING = 4;
      
    /**
     * Initialize a layer from a given image path
     * 
     * From an upload form, you can give the "tmp_name" path
     * 
     * @param string $path
     * 
     * @return ImageWorkshopLayer
     */
    public static function initFromPath($path)
    {
        if (file_exists($path) && !is_dir($path)) {
            
            if (!is_readable($path)) {
                throw new ImageWorkshopException('Can\'t open the file at "'.$path.'" : file is not writable, did you check permissions (755 / 777) ?', static::ERROR_NOT_WRITABLE_FILE);
            }
            
            $imageSizeInfos = @getImageSize($path);
            $mimeContentType = explode('/', $imageSizeInfos['mime']);
            
            if (!$mimeContentType || !array_key_exists(1, $mimeContentType)) {
                throw new ImageWorkshopException('Not an image file (jpeg/png/gif) at "'.$path.'"', static::ERROR_NOT_AN_IMAGE_FILE);
            }
            
            $mimeContentType = $mimeContentType[1];
            
            switch ($mimeContentType) {
                case 'jpeg':
                    $image = imageCreateFromJPEG($path);
                break;

                case 'gif':
                    $image = imageCreateFromGIF($path);
                break;

                case 'png':
                    $image = imageCreateFromPNG($path);
                break;

                default:
                    throw new ImageWorkshopException('Not an image file (jpeg/png/gif) at "'.$path.'"', static::ERROR_NOT_AN_IMAGE_FILE);
                break;
            }
            
            return new ImageWorkshopLayer($image);
        }
        
        throw new ImageWorkshopException('No such file found at "'.$path.'"', static::ERROR_IMAGE_NOT_FOUND);
    }
    
	
	/**
     * Initialize a layer from a given image url
     * 
     * 
     * @param string $url
     * 
     * @return ImageWorkshopLayer
     */
    public static function initFromUrl($url) {
        $ch = curl_init();

		curl_setopt($ch, CURLOPT_AUTOREFERER, true);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_USERAGENT, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_URL, $url);
	
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
		
		// must use it for pinterest -> Feb 2014 
		if(strpos($url, 'pinterest.com') !== false) {
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
		}
	
		$data = curl_exec($ch);
		curl_close($ch);

        return $image = self::initFromString($data);
    }
	
	
    /**
     * Initialize a text layer
     * 
     * @param string $text
     * @param string $fontPath
     * @param integer $fontSize
     * @param string $fontColor
     * @param integer $textRotation
     * @param integer $backgroundColor
     * 
     * @return ImageWorkshopLayer
     */
    public static function initTextLayer($text, $fontPath, $fontSize = 13, $fontColor = 'ffffff', $textRotation = 0, $backgroundColor = null)
    {
        $textDimensions = ImageWorkshopLib::getTextBoxDimension($fontSize, $textRotation, $fontPath, $text);

        $layer = static::initVirginLayer($textDimensions['width'], $textDimensions['height'], $backgroundColor);
        $layer->write($text, $fontPath, $fontSize, $fontColor, $textDimensions['left'], $textDimensions['top'], $textRotation);
        
        return $layer;
    }
    
    /**
     * Initialize a new virgin layer
     * 
     * @param integer $width
     * @param integer $height
     * @param string $backgroundColor
     * 
     * @return ImageWorkshopLayer
     */
    public static function initVirginLayer($width = 100, $height = 100, $backgroundColor = null)
    {
        $opacity = 0;
        
        if (!$backgroundColor || $backgroundColor == 'transparent') {
            $opacity = 127;
            $backgroundColor = 'ffffff';
        }
        
        return new ImageWorkshopLayer(ImageWorkshopLib::generateImage($width, $height, $backgroundColor, $opacity));
    }
    
    /**
     * Initialize a layer from a resource image var
     * 
     * @param \resource $image
     * 
     * @return ImageWorkshopLayer
     */
    public static function initFromResourceVar($image)
    {
        return new ImageWorkshopLayer($image);
    }
    
    /**
     * Initialize a layer from a string (obtains with file_get_contents, cURL...)
     * 
     * This not recommanded to initialize JPEG string with this method, GD displays bugs !
     * 
     * @param string $imageString
     * 
     * @return ImageWorkshopLayer
     */
    public static function initFromString($imageString)
    {
		$image = @imagecreatefromstring($imageString);
        if ($image === false) {
            throw new ImageWorkshopException('Can\'t generate an image from the given string.', static::ERROR_CREATE_IMAGE_FROM_STRING);
        }
        
        return new ImageWorkshopLayer($image);
    }
}
?>
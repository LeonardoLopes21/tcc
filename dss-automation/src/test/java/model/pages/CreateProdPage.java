package model.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import model.data.Product;
import tools.DB;
import tools.HtmlLogger;

public class CreateProdPage {

    private static String productNameID = "productName";
    private static String priceID = "price";
    private static String regionID = "region";
    private static String departmentID = "department";
    private static String productTypeID = "productType";
    private static String saveChangesID = "saveProd";
    private static String returnID = "returnButton";
    
    private static String prodNameErrorID = "prodNameError";
    private static String priceErrorID = "priceError";
    private static String regionErrorID = "regionError";
    private static String departmentErrorID = "departmentError";
    private static String productTypeErrorID = "productTypeError";


    public static void fillProductForm(WebDriver driver, Product product, HtmlLogger logger) {
        logger.registrarPasso("Página de alteração de produto aberta", true);

        driver.findElement(By.id(productNameID)).clear();
        driver.findElement(By.id(productNameID)).sendKeys(product.getProductName());

        driver.findElement(By.id(priceID)).clear();
        driver.findElement(By.id(priceID)).sendKeys(String.valueOf(product.getPrice()));

        Select regionSelect = new Select(driver.findElement(By.id(regionID)));
        regionSelect.selectByVisibleText(product.getRegion());

        driver.findElement(By.id(departmentID)).clear();
        driver.findElement(By.id(departmentID)).sendKeys(product.getDepartment());

        Select typeSelect = new Select(driver.findElement(By.id(productTypeID)));
        typeSelect.selectByVisibleText(product.getProductType());

        logger.registrarPasso("Informações do produto preenchidas", true);
    }

    public static void saveChanges(WebDriver driver, Product product, HtmlLogger logger) throws InterruptedException {
        fillProductForm(driver, product, logger);
        Thread.sleep(900);
        driver.findElement(By.id(saveChangesID)).click();
        Thread.sleep(1000);
        driver.findElement(By.id(returnID)).click();
        Thread.sleep(1000);
    }

    public static void validatePage(WebDriver driver, HtmlLogger logger) throws InterruptedException {
    	driver.findElement(By.id(saveChangesID)).click();
    	Thread.sleep(10000);
    	
    	try {
    		WebElement prodNameError = driver.findElement(By.id(prodNameErrorID));
        	WebElement priceError = driver.findElement(By.id(priceErrorID));
        	WebElement regionError = driver.findElement(By.id(regionErrorID));
        	WebElement departmentError = driver.findElement(By.id(departmentErrorID));
        	WebElement productTypeError = driver.findElement(By.id(productTypeErrorID));
        	
        	if (prodNameError.getText().toLowerCase().contains("obrigat") && priceError.getText().toLowerCase().contains("obrigat") && regionError.getText().toLowerCase().contains("obrigat") && departmentError.getText().toLowerCase().contains("obrigat") && productTypeError.getText().toLowerCase().contains("obrigat")) {
        	    logger.registrarPasso("Campos em vazio contém as validações necessarias", true);
        	    createExistingDoc(driver, logger);
        	}


        	
    	} catch(Exception e) {
    		
    	}
    	
        
    	
    }
    
	public static void createExistingDoc(WebDriver driver, HtmlLogger logger) throws InterruptedException {
		Product p = DB.getFirstProd();
		
		fillProductForm(driver, p, logger);
		
		driver.findElement(By.id(saveChangesID)).click();
    	Thread.sleep(10000);
    	
    	try {
    		WebElement prodNameError = driver.findElement(By.id(prodNameErrorID));
    		if(prodNameError.getText().toLowerCase().contains("existe um produto com este nome")){
    			logger.registrarPasso("Funcionando corretamente, validação ativada", true);
    		} else {
    			logger.registrarPasso("Erro na validação", false);
    		}
    	} catch (Exception e) {
    		System.out.println(e);
    		logger.registrarPasso(e.toString(), false);
    	}
		
		
	}
}

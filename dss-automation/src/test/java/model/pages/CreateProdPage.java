package model.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

import model.data.Product;
import tools.HtmlLogger;

public class CreateProdPage {

    private static String productNameID = "productName";
    private static String priceID = "price";
    private static String regionID = "region";
    private static String departmentID = "department";
    private static String productTypeID = "productType";
    private static String saveChangesID = "saveProd";
    private static String returnID = "returnButton";

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
}

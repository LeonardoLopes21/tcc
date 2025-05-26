package model.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import model.data.Product;
import model.data.User;
import tools.DB;
import tools.HtmlLogger;

public class MenuPage {
	
	private static String viewUsersID = "viewUsersPage";
	private static String createProdID = "createProd";
	private static String viewProdID = "viewProds";
	
	public static void enterUserPage(WebDriver driver) throws InterruptedException {
		driver.findElement(By.id(viewUsersID)).click();
		Thread.sleep(1000);
	}
	
	public static void enterCreateProdPage(WebDriver driver) throws InterruptedException {
		driver.findElement(By.id(createProdID)).click();
		Thread.sleep(1000);
	}
	
	public static void enterViewProdsPage(WebDriver driver) throws InterruptedException {
		driver.findElement(By.id(viewProdID)).click();
		Thread.sleep(1000);
	}
	
	public static void deleteUser(WebDriver driver, String name, HtmlLogger logger) throws InterruptedException {
		
		User u = DB.getUserFromName(name);
		
		enterUserPage(driver);
		logger.registrarPasso("Lista de Usuarios", true);
		driver.findElement(By.id("delete" + u.getId())).click();
		Thread.sleep(1000);
		driver.findElement(By.id("confirmdelete" + u.getId())).click();
		
		
	}
	
	public static void deleteProduct(WebDriver driver, String name, HtmlLogger logger) throws InterruptedException {

	    Product p = DB.getProductByName(name);

	    enterViewProdsPage(driver);
	    logger.registrarPasso("Lista de Produtos", true);
	    driver.findElement(By.id("delete" + p.getId())).click();
	    Thread.sleep(1000);
	    driver.findElement(By.id("confirmdelete" + p.getId())).click();

	}

	
	

}

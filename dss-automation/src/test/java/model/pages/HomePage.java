package model.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import services.Driver;

public class HomePage {
	
	private static String enterButtonId  = "enterButton";
	
	public static void enterLogin(WebDriver driver) throws InterruptedException {
		
		Thread.sleep(3000);
		
		WebElement enterButton = driver.findElement(By.id(enterButtonId));
		
		enterButton.click();
		
	}

}

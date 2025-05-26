package model.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import model.data.User;

public class LoginPage {
	
	private static String emailID = "email";
	private static String passwordID = "senha";
	private static String finalizeButtonID = "finalizeButton";
	private static String warningMessageID = "warningMessage";
	
	
	public static void fillEmailField(WebDriver driver, String email) {
		WebElement field = driver.findElement(By.id(emailID));
		field.sendKeys(email);
	}
	
	public static void fillPasswordField(WebDriver driver, String pass) {
		WebElement field = driver.findElement(By.id(passwordID));
		field.sendKeys(pass);
	}
	
	public static void attemptToFinalize(WebDriver driver) {
		WebElement field = driver.findElement(By.id(finalizeButtonID));
		field.click();
	}
	
	public static void attemptLogin(WebDriver driver) throws InterruptedException {
		Thread.sleep(500);
		User unavailable = User.getUnavailableUser();
		fillEmailField(driver, unavailable.getEmail());
		fillPasswordField(driver, unavailable.getSenha());
		Thread.sleep(500);
		attemptToFinalize(driver);
		Thread.sleep(5000);
		
	}
	
	public static boolean verifyIfSuccessful(WebDriver driver) {
		WebElement warning = driver.findElement(By.id(warningMessageID));
		if(warning.getText() != null) {
			return false;
		} else {
			return true;
		}
		
	}
	
	

}

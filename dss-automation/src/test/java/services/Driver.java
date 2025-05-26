package services;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Driver {
	
	public static WebDriver launch() {
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/");
		driver.manage().window().maximize();
		return driver;
	}

}

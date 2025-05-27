package testcases;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;

import model.data.Product;
import model.data.User;
import model.pages.CreateProdPage;
import model.pages.HomePage;
import model.pages.LoginPage;
import model.pages.MenuPage;
import services.Driver;
import tools.DB;
import tools.HtmlLogger;

public class Testcase_04_CreateInvalidOrExistingInfo {
	
	@Test
	public void createInvalidOrExistingInfo() throws InterruptedException {
		
		HtmlLogger logger = new HtmlLogger("Testcase_04_CreateInvalidOrExistingInfo");
        WebDriver driver = Driver.launch();
        HomePage.enter(driver);
        LoginPage.createExistingUser(driver, logger);
        HomePage.enter(driver);
        MenuPage.enterCreateProdPage(driver);
        CreateProdPage.validatePage(driver, logger);;
        
        logger.gerarRelatorio();
        
        driver.close();
        
		
	}

}

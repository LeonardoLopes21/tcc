package testcases;

import java.util.ArrayList;

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


public class Testcase_03_CreateValidDocument {
	
	@Test
	public void createValidDocAndDelete() throws InterruptedException {
		HtmlLogger logger = new HtmlLogger("Testcase_03_CreateValidDocument");
        WebDriver driver = Driver.launch();
        LoginPage.quickLogin(driver, logger);
        Thread.sleep(5000);
        MenuPage.enterCreateProdPage(driver);
        Product rep = Product.createSampleProduct();
        Thread.sleep(1000);
        CreateProdPage.saveChanges(driver, rep, logger);
        Thread.sleep(1000);
        MenuPage.deleteProduct(driver, rep.getProductName(), logger);
        Thread.sleep(5000);
        ArrayList<Product> allProds = DB.getAllProds();
        
        for(Product p : allProds) {
        	if(p.getId().equals(rep.getId())) {
        		logger.registrarPasso("Produto ainda presente no banco de dados, falha em deletar", false);
        	}
        }
        
        logger.gerarRelatorio();
        driver.close();
	}

}

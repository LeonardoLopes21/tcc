package testcases;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;
import tools.HtmlLogger;
import model.pages.HomePage;
import model.pages.LoginPage;
import services.Driver;
import tools.DB;

public class Testcase_01_LoginWithWrongCredentials {
	
	@Test
	public static void main() throws InterruptedException {
		HtmlLogger logger = new HtmlLogger("Testcase_01_LoginWithWrongCredentials");
		WebDriver driver = Driver.launch();
		HomePage.enterLogin(driver);
		
		
		try {
			LoginPage.attemptLogin(driver);
			if(!LoginPage.verifyIfSuccessful(driver)) {
				logger.registrarPasso("Sucesso, mensagem de erro aparece corretamente", true);
			}
		} catch (Exception e) {
			logger.registrarPasso("Falha, mensagem de erro não apareceu corretamente", false);
		}
		logger.gerarRelatorio();
		driver.close();
	}

}

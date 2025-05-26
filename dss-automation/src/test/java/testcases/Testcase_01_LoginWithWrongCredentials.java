package testcases;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import tools.HtmlLogger;
import model.pages.HomePage;
import model.pages.LoginPage;
import services.Driver;

public class Testcase_01_LoginWithWrongCredentials {

    @Test
    public void loginWithWrongCredentials() throws InterruptedException {
        HtmlLogger logger = new HtmlLogger("Testcase_01_LoginWithWrongCredentials");
        WebDriver driver = Driver.launch();
        try {
            HomePage.enter(driver);
            LoginPage.attemptUnavailableLogin(driver);
            if (!LoginPage.verifyIfSuccessful(driver)) {
                logger.registrarPasso("Sucesso, mensagem de erro aparece corretamente", true);
            }
        } catch (Exception e) {
            logger.registrarPasso("Falha, mensagem de erro não apareceu corretamente", false);
        }
        logger.gerarRelatorio();
        driver.close();
    }
}

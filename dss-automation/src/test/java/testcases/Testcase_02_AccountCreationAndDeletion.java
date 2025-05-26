package testcases;

import java.util.ArrayList;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;
import model.data.User;
import model.pages.HomePage;
import model.pages.LoginPage;
import model.pages.MenuPage;
import services.Driver;
import tools.DB;
import tools.HtmlLogger;

public class Testcase_02_AccountCreationAndDeletion {

    @Test
    public void createAnAccountAndDeleteIt() throws InterruptedException {
        HtmlLogger logger = new HtmlLogger("Testcase_02_AccountCreationAndDeletion");
        WebDriver driver = Driver.launch();
        User u = User.getValidUser();

        HomePage.enter(driver);
        LoginPage.createValidUserAndLogin(driver, u, logger);

        if (LoginPage.verifyIfSuccessful(driver)) {
            logger.registrarPasso("Sucesso, cadastro e login realizado com sucesso", true);
        } else {
            logger.registrarPasso("Falha, credencial errada", false);
        }

        HomePage.enter(driver);
        MenuPage.deleteUser(driver, u.getNome(), logger);
        Thread.sleep(5000);
        ArrayList<User> allUsers = DB.getAllUsers();
        for(User us : allUsers) {
        	if(u.getEmail() == us.getEmail()) {
        		logger.registrarPasso("Falha ao deletar usuário", false);
        	} else {
        		logger.registrarPasso("Sucesso ao deletar o usuário", true);
        	}
        }
        Thread.sleep(5000);
        logger.gerarRelatorio();
        driver.close();
    }
}

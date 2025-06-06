package model.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import model.data.User;
import tools.DB;
import tools.HtmlLogger;

public class LoginPage {
	
	private static String emailID = "email";
	private static String passwordID = "senha";
	private static String nomeID = "nome";
	private static String sobrenomeID = "sobrenome";
	private static String cpfID = "cpf";
	private static String birthdateID = "nascimento";
	private static String addressID = "endereco";
	private static String finalizeButtonID = "finalizeButton";
	private static String backButtonID = "backButton";
	private static String warningMessageID = "warningMessage";
	private static String switchBtnID = "switchPerspective";
	
	
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
	
	public static void attemptUnavailableLogin(WebDriver driver) throws InterruptedException {
		Thread.sleep(500);
		User unavailable = User.getUnavailableUser();
		fillEmailField(driver, unavailable.getEmail());
		fillPasswordField(driver, unavailable.getSenha());
		Thread.sleep(500);
		attemptToFinalize(driver);
		Thread.sleep(5000);
		
	}
	
	public static void loginUser(WebDriver driver, User u) throws InterruptedException {
		Thread.sleep(1500);
		fillEmailField(driver, u.getEmail());
		fillPasswordField(driver, u.getSenha());
		Thread.sleep(500);
		attemptToFinalize(driver);
		Thread.sleep(5000);
		
	}
	
	public static boolean verifyIfSuccessful(WebDriver driver) {
		WebElement warning;
		try {
			warning = driver.findElement(By.id(warningMessageID));
		} catch (Exception e) {
			warning = null;
		}
		
		if(warning != null) {
			return false;
		} else {
			return true;
		}
		
	}

public static void fillForm(WebDriver driver, HtmlLogger logger, User u) {
	WebElement emailfield = driver.findElement(By.id(emailID));
	WebElement passwordfield = driver.findElement(By.id(passwordID));
	WebElement nomefield = driver.findElement(By.id(nomeID));
	WebElement sobrenomefield = driver.findElement(By.id(sobrenomeID));
	WebElement cpffield = driver.findElement(By.id(cpfID));
	WebElement birthdatefield = driver.findElement(By.id(birthdateID));
	WebElement adressfield = driver.findElement(By.id(addressID));

	logger.registrarPasso("Página de Criação Aberta", true);

	nomefield.clear();
	nomefield.sendKeys(u.getNome());

	sobrenomefield.clear();
	sobrenomefield.sendKeys(u.getSobrenome());

	cpffield.clear();
	cpffield.sendKeys(u.getCpf());

	birthdatefield.clear();
	birthdatefield.sendKeys(u.getBirthdate());

	adressfield.clear();
	adressfield.sendKeys(u.getAddress());

	emailfield.clear();
	emailfield.sendKeys(u.getEmail());

	passwordfield.clear();
	passwordfield.sendKeys(u.getSenha());


}
	
public static void createExistingUser(WebDriver driver, HtmlLogger logger) throws InterruptedException {
		
		Thread.sleep(500);
		WebElement switcher = driver.findElement(By.id(switchBtnID));
		switcher.click();
		Thread.sleep(1000);
		
		User u = DB.getFirstUser();
		JavascriptExecutor js = (JavascriptExecutor) driver;
		
		fillForm(driver, logger, u);
        
        Thread.sleep(2000);
        
        logger.registrarPasso("Informação Preenchida", true);
		
        attemptToFinalize(driver);
        
        Thread.sleep(10000);
        
        try {
        	WebElement warning = driver.findElement(By.id(warningMessageID));
        	if(warning.getText().contains("CPF já está cadastrado") && warning.getText().contains("email já está cadastrado")  ) {
        		logger.registrarPasso("Sucesso, mensagens de erro aparecem corretamente", true);
        		Thread.sleep(1000);
        	} else {
        		logger.registrarPasso("Falha, mensagens de erro aparecem incorretamente", false);
        		Thread.sleep(1000);
        	}
        	
        	u.setBirthdate("01011000");
        	fillForm(driver, logger, u);
        	attemptToFinalize(driver);
        	Thread.sleep(10000);
        	
        	warning = driver.findElement(By.id(warningMessageID));
        
        	if(warning.getText().contains("insira uma data de nascimento válida")) {
        		logger.registrarPasso("Sucesso, mensagem de erro aparece corretamente", true);
        		Thread.sleep(1000);
        	} else {
        		logger.registrarPasso("Falha, mensagem de erro de data de nascimento aparece incorretamente", false);
        		Thread.sleep(1000);
        	}
        	
        	js.executeScript("document.getElementById(\""+switchBtnID+"\").scrollIntoView(true)");
        	Thread.sleep(1000);
        	switcher.click();
        	Thread.sleep(1000);
        	driver.findElement(By.id(finalizeButtonID)).click();
            
        } catch (Exception e) {
        	System.out.println(e);
        	
        }
        
		
	}

	public static void createValidUserAndLogin(WebDriver driver, User u, HtmlLogger logger) throws InterruptedException {
		
		Thread.sleep(500);
		WebElement switcher = driver.findElement(By.id(switchBtnID));
		switcher.click();
		Thread.sleep(1000);
		
		
		WebElement emailfield = driver.findElement(By.id(emailID));
		WebElement passwordfield = driver.findElement(By.id(passwordID));
		WebElement nomefield = driver.findElement(By.id(nomeID));
		WebElement sobrenomefield = driver.findElement(By.id(sobrenomeID));
		WebElement cpffield = driver.findElement(By.id(cpfID));
		WebElement birthdatefield = driver.findElement(By.id(birthdateID));
		WebElement adressfield = driver.findElement(By.id(addressID));
		
		logger.registrarPasso("Página de Criação Aberta", true);
		
		nomefield.sendKeys(u.getNome());
        sobrenomefield.sendKeys(u.getSobrenome());
        cpffield.sendKeys(u.getCpf());
        birthdatefield.sendKeys(u.getBirthdate());
        adressfield.sendKeys(u.getAddress());
        emailfield.sendKeys(u.getEmail());
        passwordfield.sendKeys(u.getSenha());
        
        Thread.sleep(2000);
        
        logger.registrarPasso("Informação Preenchida", true);
		
        attemptToFinalize(driver);
        
        Thread.sleep(10000);
        
        logger.registrarPasso("Conta Criada", true);
        
        Thread.sleep(10000);
        
        loginUser(driver, u);
		
	}

	public static void quickLogin(WebDriver driver, HtmlLogger logger) throws InterruptedException {
		
		HomePage.enter(driver);
		
		User u = DB.getFirstUser();
		
		loginUser(driver, u);
		
		HomePage.enter(driver);
		
	}
	
	

}

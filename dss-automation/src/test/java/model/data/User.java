package model.data;

public class User {
	
	private String id;
	private String email;
	private String senha;
	private String nome;
	private String sobrenome;
	private String cpf;
	private String birthdate;
	private String address;
	
	
	
	public User(String email, String senha, String nome, String sobrenome, String cpf, String birthdate,
			String address) {
		
		this.email = email;
		this.senha = senha;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.cpf = cpf;
		this.birthdate = birthdate;
		this.address = address;
	}
	
	
	
	public String getId() {
		return id;
	}



	public void setId(String id) {
		this.id = id;
	}


	public static User getUnavailableUser() {
		
		User a = new User("asd@gmail.com", "asd123", "j", "c", "11122233344", "1900-10-10", "Street Rua 111");
		return a;
		
		
	}
	
	



	public User(String id, String email, String senha, String nome, String sobrenome, String cpf, String birthdate,
			String address) {
		this.id = id;
		this.email = email;
		this.senha = senha;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.cpf = cpf;
		this.birthdate = birthdate;
		this.address = address;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getSenha() {
		return senha;
	}



	public void setSenha(String senha) {
		this.senha = senha;
	}



	public String getNome() {
		return nome;
	}



	public void setNome(String nome) {
		this.nome = nome;
	}



	public String getSobrenome() {
		return sobrenome;
	}



	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}



	public String getCpf() {
		return cpf;
	}



	public void setCpf(String cpf) {
		this.cpf = cpf;
	}



	public String getBirthdate() {
		return birthdate;
	}



	public void setBirthdate(String birthdate) {
		this.birthdate = birthdate;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public static User getValidUser() {
		
		User u = new User("jucabala@gmail.com", "juquita123", "Juca", "Bala", "16384933273", "01012000", "Mariano Procópio N°37");
		
		return u;
	}
	
	

}

package tools;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.data.Product;
import model.data.User;

import java.io.File;
import java.util.ArrayList;

public class DB {
	

	public static User getUserFromName(String name) {
		
		ArrayList<User> users = getAllUsers();
		
		for(User u: users) {
			if(u.getNome().equals(name)) {
				return u;
			}
		}
		
		return null;
		
	}
	
	public static Product getProductByName(String name) {
	    ArrayList<Product> products = getAllProds();

	    for (Product p : products) {
	        if (p.getProductName().equals(name)) {
	            return p;
	        }
	    }

	    return null;
	}

	
	public static User getFirstUser() {
		
		ArrayList<User> users = getAllUsers();
		
		return users.get(0);
		
	}

    public static ArrayList<User> getAllUsers() {
        String absolutePath = "E:\\Users\\Documents\\GitHub\\tcc\\dss\\src\\db\\db.json";
        
        ArrayList<User> users = new ArrayList<User>();
        
        ObjectMapper objectMapper = new ObjectMapper();
        
        try {
        	
            JsonNode root = objectMapper.readTree(new File(absolutePath));
            JsonNode usersArray = root.get("users");
            if (usersArray != null && usersArray.isArray()) {
                for (JsonNode user : usersArray) {
                    String id = user.get("id").asText();
                    String email = user.get("email").asText();
                    String nome = user.get("nome").asText();
                    String senha = user.get("senha").asText();
                    String sobrenome = user.get("sobrenome").asText();
                    String cpf = user.get("cpf").asText();
                    String nascimento = user.get("nascimento").asText();
                    String endereco = user.get("endereco").asText();
                    
                    User u = new User(id, email, senha, nome, sobrenome, cpf, nascimento, endereco);
                    
                    users.add(u);
                }
            }
            
            return users;
        } catch (Exception e) {
            System.out.println(e);
            return users;
        }
    }
    
    public static ArrayList<Product> getAllProds() {
        String absolutePath = "E:\\Users\\Documents\\GitHub\\tcc\\dss\\src\\db\\db.json";
        
        ArrayList<Product> products = new ArrayList<>();
        
        ObjectMapper objectMapper = new ObjectMapper();
        
        try {
            JsonNode root = objectMapper.readTree(new File(absolutePath));
            JsonNode prodsArray = root.get("prods");
            if (prodsArray != null && prodsArray.isArray()) {
                for (JsonNode prod : prodsArray) {
                    String id = prod.get("id").asText();
                    String productName = prod.get("productName").asText();
                    double price = prod.get("price").asDouble();
                    String region = prod.get("region").asText();
                    String department = prod.get("department").asText();
                    String productType = prod.get("productType").asText();
                    
                    Product p = new Product(productName, id, price, region, department, productType);
                    products.add(p);
                }
            }
            return products;
        } catch (Exception e) {
            System.out.println("Error loading products: " + e);
            return products;
        }
    }
}

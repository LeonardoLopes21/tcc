package tools;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.data.User;

import java.io.File;

public class DB {

    public static User[] getAllUsers() {
        String absolutePath = "E:\\Users\\Documents\\GitHub\\tcc\\dss\\src\\db\\db.json";

        User[] users;
        
        ObjectMapper objectMapper = new ObjectMapper();
        
        

        try {
        	int i = 0;
            JsonNode root = objectMapper.readTree(new File(absolutePath));
            JsonNode usersArray = root.get("users");
            users = new User[usersArray.size()];
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
                    users[i] = u;
                    i++;
                }
            }
            
            return users;
        } catch (Exception e) {
            System.out.println(e);
            users = new User[0];
            return users;
        }
    }
}

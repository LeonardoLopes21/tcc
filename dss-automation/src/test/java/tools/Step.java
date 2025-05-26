package tools;

public class Step {
    String descricao;
    boolean status;
    String screenshotFilename;

    public Step(String descricao, boolean status, String screenshotFilename) {
        this.descricao = descricao;
        this.status = status;
        this.screenshotFilename = screenshotFilename;
    }
}

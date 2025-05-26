package tools;

import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

public class HtmlLogger {

    private final List<Step> passos = new ArrayList<>();
    private String caminhoArquivo = "E:/Users/Documents/GitHub/tcc/dss-automation/src/test/java/logs/";
    private final String pastaScreenshots = "E:/Users/Documents/GitHub/tcc/dss-automation/src/test/java/logs/screenshots/";
    private int passoCounter = 0;

    public HtmlLogger(String filename) {
    	caminhoArquivo += filename +".html";
        File dir = new File(pastaScreenshots);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public void registrarPasso(String descricao, boolean status) {
        passoCounter++;
        String nomeScreenshot = "step" + passoCounter + ".png";
        try {
            capturarScreenshot(pastaScreenshots + nomeScreenshot);
        } catch (Exception e) {
            nomeScreenshot = "";
        }
        passos.add(new Step(descricao, status, nomeScreenshot));
    }

    private void capturarScreenshot(String caminhoCompleto) throws AWTException, IOException {
        Robot robot = new Robot();
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        Rectangle screenRect = new Rectangle(screenSize);
        BufferedImage screenFullImage = robot.createScreenCapture(screenRect);
        ImageIO.write(screenFullImage, "png", new File(caminhoCompleto));
    }

    public void gerarRelatorio() {
        try (BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(new FileOutputStream(caminhoArquivo), "UTF-8")
        )) {
            writer.write("<!DOCTYPE html>\n");
            writer.write("<html lang=\"pt-br\">\n");
            writer.write("<head>\n");
            writer.write("    <meta charset=\"UTF-8\">\n");
            writer.write("    <title>Relatório de Execução</title>\n");
            writer.write("    <style>\n");
            writer.write("        body { font-family: Arial; padding: 20px; }\n");
            writer.write("        table { width: 100%; border-collapse: collapse; }\n");
            writer.write("        th, td { padding: 10px; border: 1px solid #ccc; text-align: left; vertical-align: top; }\n");
            writer.write("        th { background-color: #f2f2f2; }\n");
            writer.write("        .true { color: green; }\n");
            writer.write("        .false { color: red; font-weight: bold; }\n");
            writer.write("        img { max-width: 300px; border: 1px solid #ccc; margin-top: 5px; }\n");
            writer.write("    </style>\n");
            writer.write("</head>\n");
            writer.write("<body>\n");
            writer.write("    <h1>Relatório de Execução de Testes</h1>\n");
            writer.write("    <table>\n");
            writer.write("        <tr><th>Passo</th><th>Status</th><th>Screenshot</th></tr>\n");

            for (Step passo : passos) {
                writer.write("<tr>\n");
                writer.write("  <td>" + passo.descricao + "</td>\n");
                writer.write("  <td class='" + passo.status + "'>" + (passo.status ? "SUCESSO" : "FALHA") + "</td>\n");
                if (passo.screenshotFilename != null && !passo.screenshotFilename.isEmpty()) {
                    String caminhoRelativo = "screenshots/" + passo.screenshotFilename;
                    writer.write("  <td><img src='" + caminhoRelativo + "' alt='Screenshot'></td>\n");
                } else {
                    writer.write("  <td>(Nenhuma screenshot)</td>\n");
                }
                writer.write("</tr>\n");
            }

            writer.write("    </table>\n");
            writer.write("</body>\n");
            writer.write("</html>\n");

            System.out.println("Relatório HTML gerado com sucesso em: " + caminhoArquivo);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

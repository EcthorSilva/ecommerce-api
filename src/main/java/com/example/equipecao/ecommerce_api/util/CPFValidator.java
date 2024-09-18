package com.example.equipecao.ecommerce_api.util;

public class CPFValidator {

    public static boolean isValidCPF(String cpf) {
        // Remove caracteres não numéricos
        cpf = cpf.replaceAll("[^0-9]", "");

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length() != 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        final String finalCpf = cpf;
        if (finalCpf.chars().allMatch(ch -> ch == finalCpf.charAt(0))) {
            return false;
        }

        // Calcula e verifica o primeiro dígito verificador
        int sum = 0;
        for (int i = 0; i < 9; i++) {
            sum += (cpf.charAt(i) - '0') * (10 - i);
        }
        int firstDigit = (sum * 10) % 11;
        if (firstDigit == 10) firstDigit = 0;
        if (firstDigit != cpf.charAt(9) - '0') {
            return false;
        }

        // Calcula e verifica o segundo dígito verificador
        sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += (cpf.charAt(i) - '0') * (11 - i);
        }
        int secondDigit = (sum * 10) % 11;
        if (secondDigit == 10) secondDigit = 0;
        return secondDigit == cpf.charAt(10) - '0';
    }
}
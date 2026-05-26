# Instruções para agentes de IA

## Documentação obrigatória

Antes de escrever qualquer código que use APIs do Expo, leia a documentação exata da versão instalada:

```
https://docs.expo.dev/versions/v54.0.0/
```

O projeto usa **Expo SDK 54** (não 56 nem latest). Não assuma que APIs ou nomes de pacotes são os mesmos de outras versões.

## Instalação de pacotes

Use sempre `npx expo install` para adicionar dependências — isso garante a versão compatível com o SDK 54:

```bash
npx expo install <pacote>
```

Após instalar, confirme com `npx expo install --check` que não há incompatibilidades.

## npm install

Este projeto requer a flag `--legacy-peer-deps`:

```bash
npm install --legacy-peer-deps
```

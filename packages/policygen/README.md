# PolicyGen

PolicyGen is a tool to codify your privacy and terms of service policies and auto-generate great-looking pages for your website or app.

[Get Started with PolicyGen](https://policygen.xyz)

---

## Quick Start

### Installation

You can use PolicyGen by installing a local copy into your node modules or using `npx`.

```bash
npm install --save-dev policygen
```

---

### Configuration

You will need to create a `policygen.json` configuration file for each project. This file specifies the policies that your company implements.

To create the `policygen.json` file, run the `init` command in the root folder of your project:

```bash
npx policygen init
```

The `init` function will walk you through answering a series of policy-related questions in a wizard format. If you want to skip the wizard, you can pass the `--default` flag to emit a blank default `policygen.json` file instead.

---

### Generation

Once your `policygen.json` file is set up, you can generate your policy files.

The `generate` command takes flags to specify which policies you want to generate. By default, it generates all policies (`:all`).

#### Examples:

- **Generate All Policies**:
  ```bash
  npx policygen generate
  ```

- **Generate Privacy Policy**:
  ```bash
  npx policygen generate:privacy
  ```

- **Generate Terms of Service**:
  ```bash
  npx policygen generate:terms
  ```

---

## Documentation

For more details and advanced usage, visit the [PolicyGen Homepage](https://policygen.xyz).
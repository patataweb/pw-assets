/* */ 
"format cjs";
System.config({
  "paths": {
    "*": "*.js",
    "pw-base-aurelia/*": "lib/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "pw-assets": "npm:pw-assets@0.0.1"
  }
});


module SCSSLint::Exceptions
  # Raised when an invalid flag is given via the command line.
  class InvalidCLIOption < StandardError; end

  # Raised when the configuration file is invalid for some reason.
  class InvalidConfiguration < StandardError; end

  # Raised when an unexpected error occurs in a linter
  class LinterError < StandardError; end
end

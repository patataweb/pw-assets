module SCSSLint
  # Reports lints in an XML format.
  class Reporter::XMLReporter < Reporter
    def report_lints
      output = '<?xml version="1.0" encoding="utf-8"?>'

      output << '<lint>'
      lints.group_by(&:filename).each do |filename, file_lints|
        output << "<file name=#{filename.encode(xml: :attr)}>"

        file_lints.each do |lint|
          output << issue_tag(lint)
        end

        output << '</file>'
      end
      output << '</lint>'

      output
    end

  private

    def issue_tag(lint)
      "<issue linter=\"#{lint.linter.name if lint.linter}\" " \
             "line=\"#{lint.location.line}\" " \
             "column=\"#{lint.location.column}\" " \
             "length=\"#{lint.location.length}\" " \
             "severity=\"#{lint.severity}\" " \
             "reason=#{lint.description.encode(xml: :attr)} />"
    end
  end
end

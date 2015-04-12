require 'spec_helper'

describe SCSSLint::Linter do
  describe 'control comments' do
    let(:linter_config) { {} }
    subject             { SCSSLint::Linter::Fake.new }

    module SCSSLint
      class Linter::Fake < SCSSLint::Linter
        def visit_prop(node)
          return unless node.value.to_sass.strip == 'fail1'
          add_lint(node, 'everything offends me')
        end

        # Bypasses the visit order so a control comment might not be reached before a lint is
        # added
        def visit_rule(node)
          node.children
              .select { |child| child.is_a?(Sass::Tree::PropNode) }
              .reject { |prop| prop.name.any? { |item| item.is_a?(Sass::Script::Node) } }
              .each do |prop|
                add_lint(prop, 'everything offends me 2') if prop.value.to_sass.strip == 'fail2'
              end

          yield
        end
      end
    end

    context 'when a disable is not present' do
      let(:css) { <<-CSS }
        p {
          border: fail1;

          a {
            border: fail1;
          }
        }
      CSS

      it { should report_lint }
    end

    context 'when a disable is present at the top level' do
      let(:css) { <<-CSS }
        // scss-lint:disable Fake
        p {
          border: fail1;

          a {
            border: fail1;
          }
        }
      CSS

      it { should_not report_lint }
    end

    context 'when a disable is present at the top level for another linter' do
      let(:css) { <<-CSS }
        // scss-lint:disable Bogus
        p {
          border: fail1;
        }
        p {
          border: bogus;
        }
      CSS

      it { should report_lint lint: 3 }
    end

    context 'when a linter is disabled then enabled again' do
      let(:css) { <<-CSS }
        // scss-lint:disable Fake
        p {
          border: fail1;
        }
        // scss-lint:enable Fake
        p {
          border: fail1;
        }
      CSS

      it { should_not report_lint line: 3 }
      it { should report_lint line: 7 }
    end

    context 'when a linter is disabled within a rule' do
      let(:css) { <<-CSS }
        p {
          // scss-lint:disable Fake
          border: fail1;

          a {
            border: fail1;
          }
        }

        p {
          border: fail1;
        }
      CSS

      it { should_not report_lint line: 3 }
      it { should_not report_lint line: 6 }
      it { should report_lint line: 11 }
    end

    context 'when more than one linter is disabled' do
      let(:css) { <<-CSS }
        // scss-lint:disable Bogus, Fake
        p {
          border: fail1;
        }

        p {
          border: bogus;
        }
      CSS

      it { should_not report_lint }
    end

    context 'when more than one linter is disabled without spaces between the linter names' do
      let(:css) { <<-CSS }
        // scss-lint:disable Fake,Bogus
        p {
          border: fail1;
        }

        p {
          border: Bogus;
        }
      CSS

      it { should_not report_lint }
    end

    context 'when more than one linter is disabled without commas between the linter names' do
      let(:css) { <<-CSS }
        // scss-lint:disable Fake Bogus
        p {
          border: fail1;
        }

        p {
          border: bogus;
        }
      CSS

      it { should_not report_lint }
    end

    context 'when two linters are disabled and only one is reenabled' do
      let(:css) { <<-CSS }
        // scss-lint:disable Fake, Bogus
        p {
          border: fail1;
        }
        // scss-lint:enable Fake

        p {
          margin: fail1;
          border: bogus;
        }
      CSS

      it { should_not report_lint line: 3 }
      it { should report_lint line: 8 }
    end

    context 'when all linters are disabled' do
      let(:css) { <<-CSS }
        // scss-lint:disable all
        p {
          border: fail1;
        }

        p {
          margin: fail1;
          border: bogus;
        }
      CSS

      it { should_not report_lint }
    end

    context 'when all linters are disabled and then one is re-enabled' do
      let(:css) { <<-CSS }
        // scss-lint:disable all
        p {
          border: fail1;
        }
        // scss-lint:enable Fake

        p {
          margin: fail1;
          border: bogus;
        }
      CSS

      it { should_not report_lint line: 3 }
      it { should report_lint line: 8 }
    end

    context 'when a linter is bypassing the visit tree order' do
      let(:css) { <<-CSS }
        p {
          // scss-lint:disable Fake
          border: fail2;
        }
      CSS

      it { should_not report_lint }
    end

    context 'when the command comment is next to other comments' do
      let(:css) { <<-CSS }
        p {
          // scss-lint:disable Fake
          // more comments
          border: fail2;
        }

        p {
          // more comments
          // scss-lint:disable Fake
          border: fail2;
        }
      CSS

      it { should_not report_lint }
    end

    context 'when the command comment is at the end of a statement' do
      let(:css) { <<-CSS }
        p {
          border: fail1; // scss-lint:disable Fake
          border: fail1;
        }
      CSS

      it { should_not report_lint line: 2 }
      it { should report_lint line: 3 }
    end
  end
end

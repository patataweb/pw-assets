require 'spec_helper'

describe SCSSLint::Linter::ZeroUnit do
  context 'when no properties exist' do
    let(:css) { <<-CSS }
      p {
      }
    CSS

    it { should_not report_lint }
  end

  context 'when properties with unit-less zeros exist' do
    let(:css) { <<-CSS }
      p {
        margin: 0;
      }
    CSS

    it { should_not report_lint }
  end

  context 'when properties with non-zero values exist' do
    let(:css) { <<-CSS }
      p {
        margin: 5px;
        line-height: 1.5em;
      }
    CSS

    it { should_not report_lint }
  end

  context 'when properties with zero values contain units' do
    let(:css) { <<-CSS }
      p {
        margin: 0px;
      }
    CSS

    it { should report_lint line: 2 }
  end

  context 'when properties with multiple zero values containing units exist' do
    let(:css) { <<-CSS }
      p {
        margin: 5em 0em 2em 0px;
      }
    CSS

    it { should report_lint line: 2, count: 2 }
  end

  context 'when function call contains a zero value with units' do
    let(:css) { <<-CSS }
      p {
        margin: some-function(0em);
      }
    CSS

    it { should report_lint line: 2 }
  end

  context 'when mixin include contains a zero value with units' do
    let(:css) { <<-CSS }
      p {
        @include some-mixin(0em);
      }
    CSS

    it { should report_lint line: 2 }
  end

  context 'when string contains a zero value with units' do
    let(:css) { <<-CSS }
      p {
        content: func("0em");
      }
    CSS

    it { should_not report_lint }
  end

  context 'when property value has a ".0" fractional component' do
    let(:css) { <<-CSS }
      p {
        margin: 4.0em;
      }
    CSS

    it { should_not report_lint }
  end

  context 'when property value has a color hex with a leading 0' do
    let(:css) { <<-CSS }
      p {
        color: #0af;
      }
    CSS

    it { should_not report_lint }
  end

  context 'when property with zero value is a dimension' do
    let(:css) { <<-CSS }
      p {
        transition-delay: 0s;
      }
    CSS

    it { should_not report_lint }
  end
end

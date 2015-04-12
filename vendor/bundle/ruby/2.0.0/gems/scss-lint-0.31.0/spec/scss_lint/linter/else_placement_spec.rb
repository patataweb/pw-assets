require 'spec_helper'

describe SCSSLint::Linter::ElsePlacement do
  context 'when @if contains no accompanying @else' do
    let(:css) { <<-CSS }
      @if $condition {
        $var: 1;
      }
    CSS

    it { should_not report_lint }
  end

  context 'when @else is on different line' do
    let(:css) { <<-CSS }
      @if $condition {
        $var: 1;
      }
      @else {
        $var: 0;
      }
    CSS

    it { should report_lint line: 4 }
  end

  context 'when @else is on the same line as previous curly' do
    let(:css) { <<-CSS }
      @if $condition {
        $var: 1;
      } @else {
        $var: 0;
      }
    CSS

    it { should_not report_lint }
  end

  context 'when `@else if` is on different line' do
    let(:css) { <<-CSS }
      @if $condition {
        $var: 1;
      }
      @else if $other_condition {
        $var: 2;
      }
      @else {
        $var: 0;
      }
    CSS

    it { should report_lint line: 4 }
    it { should report_lint line: 7 }
  end

  context 'when `@else if` is on the same line as previous curly' do
    let(:css) { <<-CSS }
      @if $condition {
        $var: 1;
      } @else if $other_condition {
        $var: 2;
      } @else {
        $var: 0;
      }
    CSS

    it { should_not report_lint }
  end

  context 'when @else is on same line as @if' do
    let(:css) { <<-CSS }
      @if $condition { $var: 1; } @else { $var: 0; }
    CSS

    it { should_not report_lint }
  end

  context 'when placement of @else on a new line is preferred' do
    let(:linter_config) { { 'style' => 'new_line' } }

    context 'when @else is on a new line' do
      let(:css) { <<-CSS }
        @if $condition {
          $var: 1;
        }
        @else {
          $var: 0;
        }
      CSS

      it { should_not report_lint }
    end

    context 'when @else is on the same line as previous curly brace' do
      let(:css) { <<-CSS }
        @if $condition {
          $var: 1;
        } @else {
          $var: 0;
        }
      CSS

      it { should report_lint line: 3 }
    end
  end
end

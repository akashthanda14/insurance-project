// components/PDFTemplates/CalculatorResultsPDF.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#305399',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  resultBox: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    border: '1 solid #e9ecef',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#305399',
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#305399',
    textAlign: 'center',
    marginBottom: 10,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 3,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#666666',
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  inputsSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f1f3f4',
    borderRadius: 5,
  },
  inputsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  inputItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  inputLabel: {
    fontSize: 10,
    color: '#666666',
  },
  inputValue: {
    fontSize: 10,
    color: '#333333',
  },
  footer: {
    marginTop: 30,
    padding: 15,
    borderTop: '1 solid #e9ecef',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 8,
    color: '#999999',
    lineHeight: 1.3,
  },
});

interface CalculatorResultsPDFProps {
  calculatorType: 'RRSP' | 'TFSA' | 'FHSA' | 'RESP';
  results: {
    totalAmount: number;
    contributions: number;
    returns: number;
    roiRate: number;
    [key: string]: any;
  };
  inputs: {
    [key: string]: any;
  };
  userEmail: string;
}

export const CalculatorResultsPDF: React.FC<CalculatorResultsPDFProps> = ({
  calculatorType,
  results,
  inputs,
  userEmail
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getCalculatorTitle = () => {
    switch (calculatorType) {
      case 'RRSP': return 'Registered Retirement Savings Plan';
      case 'TFSA': return 'Tax-Free Savings Account';
      case 'FHSA': return 'First Home Savings Account';
      case 'RESP': return 'Registered Education Savings Plan';
      default: return 'Financial Calculator';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{calculatorType} Calculator Results</Text>
          <Text style={styles.subtitle}>
            {getCalculatorTitle()} • Generated on {new Date().toLocaleDateString('en-CA')}
          </Text>
          <Text style={styles.subtitle}>
            Prepared for: {userEmail}
          </Text>
        </View>

        {/* Main Results */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Total Projected Amount</Text>
          <Text style={styles.resultValue}>{formatCurrency(results.totalAmount)}</Text>
        </View>

        {/* Breakdown */}
        <View style={styles.section}>
          <Text style={[styles.resultTitle, { marginBottom: 15 }]}>Breakdown</Text>
          
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Your Contributions:</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(results.contributions)}</Text>
          </View>
          
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Investment Growth:</Text>
            <Text style={styles.breakdownValue}>{formatCurrency(results.returns)}</Text>
          </View>
          
          {results.govGrants && (
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Government Grants:</Text>
              <Text style={styles.breakdownValue}>{formatCurrency(results.govGrants)}</Text>
            </View>
          )}
          
          {results.taxSheltered && (
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Tax Savings Advantage:</Text>
              <Text style={styles.breakdownValue}>{formatCurrency(results.taxSheltered)}</Text>
            </View>
          )}
          
          {results.taxSavings && (
            <View style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>Tax Deduction Benefit:</Text>
              <Text style={styles.breakdownValue}>{formatCurrency(results.taxSavings)}</Text>
            </View>
          )}
          
          <View style={[styles.breakdownItem, { borderTop: '1 solid #ccc', paddingTop: 8, marginTop: 10 }]}>
            <Text style={[styles.breakdownLabel, { fontWeight: 'bold' }]}>Annual Return Rate:</Text>
            <Text style={[styles.breakdownValue, { fontWeight: 'bold' }]}>{results.roiRate}%</Text>
          </View>
        </View>

        {/* Input Parameters */}
        <View style={styles.inputsSection}>
          <Text style={styles.inputsTitle}>Calculation Parameters</Text>
          {Object.entries(inputs).map(([key, value]) => (
            <View key={key} style={styles.inputItem}>
              <Text style={styles.inputLabel}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
              </Text>
              <Text style={styles.inputValue}>
                {typeof value === 'number' && key.toLowerCase().includes('amount') 
                  ? formatCurrency(value) 
                  : String(value)}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.disclaimer}>
            This calculation is for informational purposes only. Actual results may vary based on market conditions, 
            fees, and investment choices. Please consult a financial advisor for personalized advice.
            {'\n\n'}
            Generated by Investor Insurance • Your Financial Planning Partner
          </Text>
        </View>
      </Page>
    </Document>
  );
};

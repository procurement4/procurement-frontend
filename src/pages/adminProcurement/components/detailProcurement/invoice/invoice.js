import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
  table: { 
    marginTop: 20, 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "16.6%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 
  },
  title: { 
    margin: "auto", 
    marginTop: 10, 
    fontSize: 15 
  }
});

// Create Document Component
const MyDocument = ({data}) => (
  <Document>
  <Page size="A4" orientation="landscape" style={styles.body}>
    <View>
      <Text style={styles.title}>DETAIL PROCUREMENT</Text>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.title}>{data.id}</Text>
    </View>
    <View style={styles.table}> 
      <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>Id</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>Product Name</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>Price</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>Quantity</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>Priority</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>Subtotal</Text> 
        </View>
      </View>
      {data.procurement_detail.map((item, index) => ( 
      <View key={index} style={styles.tableRow}> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{item.id}</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{item.product_detail.name}</Text> 
        </View> 
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>{item.price}</Text> 
        </View>
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{item.quantity}</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{item.priority}</Text> 
        </View> 
        <View style={styles.tableCol}> 
          <Text style={styles.tableCell}>{item.subtotal}</Text> 
        </View> 
      </View> ))}
    </View>
  </Page>
</Document>
);

export default MyDocument
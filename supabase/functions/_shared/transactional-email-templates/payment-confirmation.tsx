import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  amount?: string
  planName?: string
  paymentId?: string
  orderId?: string
  paidOn?: string
}

const PaymentConfirmation = ({ name, amount, planName, paymentId, orderId, paidOn }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Payment received — welcome to Indian Dreams!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>Indian Dreams</Text>
        <Heading style={h1}>Payment confirmed 🎉</Heading>
        <Text style={text}>{name ? `Hi ${name},` : 'Hi there,'}</Text>
        <Text style={text}>
          Thank you for joining Indian Dreams! Your payment was successful and your access is ready.
        </Text>
        <Section style={box}>
          <Text style={row}><b>Package:</b> {planName || 'Full Package'}</Text>
          <Text style={row}><b>Amount paid:</b> {amount || '₹149'}</Text>
          {paidOn ? <Text style={row}><b>Date:</b> {paidOn}</Text> : null}
          {paymentId ? <Text style={row}><b>Payment ID:</b> {paymentId}</Text> : null}
          {orderId ? <Text style={row}><b>Order ID:</b> {orderId}</Text> : null}
        </Section>
        <Button style={button} href="https://indiandreams.app/dashboard">Start learning</Button>
        <Hr style={hr} />
        <Text style={small}>Keep this email as your receipt. Questions? Just reply to this email.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PaymentConfirmation,
  subject: 'Payment confirmed — welcome to Indian Dreams',
  displayName: 'Payment confirmation',
  previewData: {
    name: 'Aryan', amount: '₹149', planName: 'Full Package',
    paymentId: 'pay_ABC123', orderId: 'order_XYZ789', paidOn: '10 November 2026',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: '"Plus Jakarta Sans", Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const brand = { fontSize: '20px', fontWeight: 700, color: '#047857', margin: '0 0 16px' }
const h1 = { fontSize: '24px', fontWeight: 700, color: '#1f2937', margin: '0 0 16px' }
const text = { fontSize: '15px', lineHeight: '24px', color: '#374151', margin: '0 0 12px' }
const box = { backgroundColor: '#fdf8ee', border: '1px solid #f1e3c2', borderRadius: '10px', padding: '14px 18px', margin: '16px 0 24px' }
const row = { fontSize: '14px', color: '#374151', margin: '4px 0' }
const button = { backgroundColor: '#047857', color: '#ffffff', padding: '12px 22px', borderRadius: '8px', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }
const hr = { borderColor: '#e5e7eb', margin: '28px 0 16px' }
const small = { fontSize: '12px', color: '#6b7280', margin: 0 }

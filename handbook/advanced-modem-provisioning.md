# Advanced Modem Provisioning

## Overview
This guide covers advanced techniques for provisioning cable and fibre modems, including configuration management and troubleshooting complex setups.

## Supported Devices
- DOCSIS 3.0/3.1 cable modems
- Fibre ONT devices
- Gateway/router combinations
- Enterprise-grade equipment

## Pre-Provisioning Checklist
✅ Customer account verified and active
✅ Service tier confirmed in billing system
✅ MAC address recorded accurately
✅ Physical installation completed
✅ Signal levels within specifications

## Provisioning Steps

### 1. System Access
- Log into provisioning portal
- Navigate to device management section
- Verify customer account status

### 2. Device Configuration
```
Device Type: [Select appropriate model]
MAC Address: [Enter without colons or spaces]
Service Profile: [Match customer's subscribed tier]
```

### 3. Advanced Settings
- **QoS Configuration**: Set bandwidth limits per service tier
- **Security Settings**: Enable/disable features as per policy
- **DHCP Reservations**: Configure static IP if required
- **Port Forwarding**: Set up customer-requested services

## Service Tiers

### Residential Plans
- **Basic**: 25/5 Mbps, standard QoS
- **Standard**: 100/10 Mbps, priority QoS
- **Premium**: 500/25 Mbps, guaranteed bandwidth

### Business Plans
- **Small Business**: 100/20 Mbps, static IP available
- **Enterprise**: Custom speeds, SLA guarantees
- **Dedicated**: Symmetrical speeds, redundancy options

## Troubleshooting Common Issues

### Device Won't Come Online
1. Verify MAC address entry
2. Check signal levels at device
3. Confirm account provisioning status
4. Reset device to factory defaults if needed

### Speed Issues
1. Test direct connection to modem
2. Check QoS configuration
3. Verify service profile settings
4. Run speed test from multiple servers

### Intermittent Connectivity
1. Monitor signal quality over time
2. Check for upstream interference
3. Examine cable connections
4. Update device firmware if available

## Advanced Features

### Load Balancing
- Configure multiple WAN connections
- Set failover priorities
- Monitor connection health

### VPN Configuration
- IPSec tunnel setup
- Certificate management
- Remote access configuration

### Network Monitoring
- SNMP monitoring setup
- Alert thresholds configuration
- Performance reporting

## Documentation Requirements
Record in customer file:
- Device MAC and serial numbers
- Configuration settings applied
- Test results and measurements
- Customer-specific requirements
- Future maintenance notes
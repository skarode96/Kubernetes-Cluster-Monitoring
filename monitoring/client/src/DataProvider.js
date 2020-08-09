export function getInitialData() {
  return [
    {
      "timestamp": "2:33:07 PM",
      "frontend": 0,
      "packets": []
    },
    {
      "timestamp": "2:34:07 PM",
      "frontend": 0,
      "packets": []
    },
    {
      "timestamp": "2:35:07 PM",
      "frontend": 0,
      "packets": []
    },
    {
      "timestamp": "2:36:07 PM",
      "frontend": 0,
      "packets": []
    },
    {
      "timestamp": "2:37:07 PM",
      "frontend": 0,
      "packets": []
    },
    {
      "timestamp": "2:38:07 PM",
      "frontend": 0,
      "packets": []
    },
    {
      "timestamp": "2:39:07 PM",
      "frontend": 0,
      "packets": []
    },
    {
      "timestamp": "2:40:07 PM",
      "frontend": 0,
      "packets": []
    }
  ];
}

export function getColumnNames() {
  return [
    {
      name: 'Timestamp',
      selector: 'timestamp',
      sortable: true
    },
    {
      name: 'Destination IP',
      selector: 'dstIP'
    },
    {
      name: 'Destination Port',
      selector: 'dstPort',
      sortable: true
    },
    {
      name: 'Size',
      selector: 'size',
      sortable: true
    },
    {
      name: 'Source IP',
      selector: 'srcIP',
      sortable: true
    }

  ];
}
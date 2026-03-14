// Mock B2B Sales Emails
export const emails = [
  {
    id: 1, from: "Marcus Webb", fromEmail: "m.webb@redpinelumber.com", avatar: "MW", avatarColor: "#1a73e8",
    to: "sales@instalily.com", subject: "Interested in your inventory tracking module",
    snippet: "Hi, our lumber yard is struggling with manual stock counts every week...",
    body: `Hi Sales Team,\n\nMy name is Marcus Webb and I'm the warehouse operations manager at Red Pine Lumber. We're a mid-sized lumber distribution company with 3 warehouses across the Pacific Northwest.\n\nWe are currently managing our inventory with a combination of spreadsheets and an aging on-premise ERP that hasn't been updated in 5 years. Every week we spend roughly 20 hours across our team doing manual stock counts, which is both error-prone and inefficient.\n\nI came across your product through a LinkedIn post and I'm really interested in the real-time inventory tracking module. A few questions:\n\n1. Does your system integrate with QuickBooks Enterprise?\n2. Can it handle multiple warehouse locations under one account?\n3. What does your per-location pricing look like for 3 locations?\n\nWe'd love to book a 30-minute demo if possible. Our team is available on Tuesdays and Thursdays.\n\nBest regards,\nMarcus Webb\nWarehouse Operations Manager\nRed Pine Lumber Co.\n(503) 882-4471`,
    date: "2026-03-14T08:23:00Z", read: false, starred: true, label: "inbox"
  },
  {
    id: 2, from: "Priya Nair", fromEmail: "pnair@axiomretail.io", avatar: "PN", avatarColor: "#e37400",
    to: "sales@instalily.com", subject: "Purchase Order Automation – Demo Request",
    snippet: "We're evaluating several platforms for automating our PO workflow...",
    body: `Hello,\n\nI'm Priya Nair, Head of Procurement at Axiom Retail – a fast-growing retail chain with 47 stores across the Southeast. We currently process over 800 purchase orders per month and our manual approval workflow is becoming a serious bottleneck.\n\nOur procurement team is actively evaluating platforms that can:\n- Automate PO creation from reorder thresholds\n- Route approvals based on dollar amount and category\n- Sync vendor invoices automatically to our accounting system\n\nWe're currently doing a 3-vendor evaluation and would love to include InstaLily in our shortlist. Can we schedule a demo for next week? I'm available Monday–Wednesday, 10am–3pm EST.\n\nAlso, could you send over a capabilities sheet and your enterprise pricing deck in advance?\n\nThank you,\nPriya Nair\nHead of Procurement\nAxiom Retail Group\n📞 (404) 217-8833`,
    date: "2026-03-14T07:45:00Z", read: false, starred: false, label: "inbox"
  },
  {
    id: 3, from: "Derek Simmons", fromEmail: "dsimmons@castironmfg.com", avatar: "DS", avatarColor: "#188038",
    to: "sales@instalily.com", subject: "ERP Integration Questions – SAP S/4HANA",
    snippet: "We're currently live on SAP S/4HANA and want to know if your system can...",
    body: `Hi,\n\nDerek Simmons here, COO at Cast Iron Manufacturing. We're a Tier-2 auto parts supplier with approximately $120M in annual revenue.\n\nWe went live on SAP S/4HANA 18 months ago and while our financials are now solid, our shop-floor inventory visibility is still lacking. We often discover stock discrepancies only at month-end which causes expedited freight costs and production delays.\n\nBefore we commit to a demo, I wanted to clarify a few technical points:\n\n- What does your SAP S/4HANA connector cover? (goods movements, stock transfers, reservations?)\n- Do you have a native mobile app for our floor workers to do real-time scans?\n- How does your system handle serial number tracking for finished goods?\n- What's your typical implementation timeline for a 6-location manufacturer?\n\nWe have a steering committee review at the end of April, so we'd need a demo + proposal by April 15th.\n\nDerek Simmons | COO\nCast Iron Manufacturing`,
    date: "2026-03-13T16:10:00Z", read: false, starred: false, label: "inbox"
  },
  {
    id: 4, from: "Lucia Fernandez", fromEmail: "l.fernandez@sunbloom-agri.com", avatar: "LF", avatarColor: "#d93025",
    to: "sales@instalily.com", subject: "Real-Time Low Stock Alerts for Agri Products",
    snippet: "Running a large nursery operation and stock-outs are killing us during peak season...",
    body: `Hello InstaLily Sales,\n\nMy name is Lucia Fernandez and I oversee supply chain for Sunbloom Agricultural Supply. We supply wholesale fertilizers, seeds, and gardening products to over 200 garden centers across the Midwest.\n\nOur biggest pain point right now is running out of popular SKUs during peak spring season without any advance warning. Last March we had 3 major stock-outs on our top-10 products that resulted in roughly $280,000 in lost revenue.\n\nI read about your stock alert feature on G2 and wanted to learn more. Specifically:\n- Can alerts be configured per SKU with custom thresholds?\n- Can we alert different team members for different product categories?\n- Do you have a forecasting module that uses historical seasonality?\n\nWe'd ideally want to be fully set up before March of next year. What does your onboarding process look like?\n\nLooking forward to hearing from you,\nLucia Fernandez\nVP of Supply Chain Operations\nSunbloom Agricultural Supply`,
    date: "2026-03-13T11:30:00Z", read: false, starred: true, label: "inbox"
  },
  {
    id: 5, from: "Tommy Okafor", fromEmail: "tokafor@brightpack.co", avatar: "TO", avatarColor: "#a142f4",
    to: "sales@instalily.com", subject: "Bulk Pricing for 12-Location Roll-Out",
    snippet: "We're planning to deploy inventory software across all 12 of our packaging plants...",
    body: `Hi Team,\n\nTommy Okafor here, Director of IT at BrightPack — a contract packaging company with 12 plants across the US and Canada.\n\nWe currently have a patchwork of local inventory tools at each plant with no central visibility. Leadership has approved a budget to consolidate onto a single platform, and InstaLily was recommended to us by a colleague at a similar operation.\n\nI'm looking for:\n1. A multi-site dashboard where our central ops team can see all plants at once\n2. User role management so plant managers have local control\n3. API access for our custom reporting tool\n4. Volume licensing — I'd need pricing for 12 sites with ~40 users each\n\nCould you share enterprise pricing and availability for a pilot program? We'd want to start with 2 plants in Q2, then expand if the results are there.\n\nTommy Okafor\nDirector of IT Infrastructure\nBrightPack Contract Packaging\n(312) 560-9142`,
    date: "2026-03-12T14:55:00Z", read: true, starred: false, label: "inbox"
  },
  {
    id: 6, from: "Aisha Grant", fromEmail: "agrant@vertexdistrib.com", avatar: "AG", avatarColor: "#00897b",
    to: "sales@instalily.com", subject: "Vendor Portal Access – Can Suppliers Self-Update?",
    snippet: "We have over 80 active vendors and it would be a game-changer if they could log in...",
    body: `Hi there,\n\nI'm Aisha Grant, Procurement Manager at Vertex Distribution – a wholesale distributor of industrial hardware and safety equipment.\n\nOne of our biggest headaches is keeping vendor lead times and pricing up to date. We have 80+ active suppliers and our internal team can't keep up with all the updates. I saw a mention of a "vendor portal" feature in one of your case studies.\n\nMy questions:\n- Can vendors log in directly and update their own lead times, MOQs, and pricing?\n- Is there an approval workflow before their changes go live?\n- Can we communicate with vendors directly through the portal (message thread per PO)?\n- How is vendor data access scoped — can they only see their own POs and products?\n\nThis feature alone could save our team 15+ hours per week. Would love a live demo focused specifically on the vendor portal.\n\nWarm regards,\nAisha Grant\nProcurement Manager | Vertex Distribution`,
    date: "2026-03-12T09:00:00Z", read: true, starred: false, label: "inbox"
  },
  {
    id: 7, from: "Brian Keller", fromEmail: "bkeller@noblesteel.com", avatar: "BK", avatarColor: "#f09300",
    to: "sales@instalily.com", subject: "Following Up – Demo We Had Last Week",
    snippet: "Just wanted to touch base after our call on Thursday. Our team really liked...",
    body: `Hi,\n\nBrian Keller from Noble Steel Products following up on the demo we had with Jessica on Thursday. Our team really appreciated the walkthrough, especially the cycle count module and the variance reporting.\n\nA couple of action items we mentioned:\n1. Can you send the deck Jessica used? Our CFO couldn't make the call and wants to review it.\n2. We need clarification on whether the "Advanced Analytics" tier includes the API integrations or if that's an add-on.\n3. Our IT team has questions about data hosting — specifically, can the data be US-only hosted?\n\nOnce we have those answers, I think we're ready to move to a formal proposal. Timeline is looking like we'd want to kick off implementation in June.\n\nThanks again, the demo was great.\n\nBrian Keller\nOperations Manager\nNoble Steel Products Inc.`,
    date: "2026-03-11T17:22:00Z", read: true, starred: true, label: "inbox"
  },
  {
    id: 8, from: "Natasha Bourne", fromEmail: "n.bourne@harborlogistics.net", avatar: "NB", avatarColor: "#1e88e5",
    to: "sales@instalily.com", subject: "3PL Warehousing – Client Inventory Segregation",
    snippet: "We operate a 3PL and need inventory to stay completely separated per client...",
    body: `Hi InstaLily team,\n\nI'm Natasha Bourne, Operations Director at Harbor Logistics — a third-party logistics provider managing fulfillment for 18 e-commerce clients out of our Chicago warehouse.\n\nIn 3PL environments, it's critical that each client's inventory is completely separate — no cross-contamination of data, no shared visibility across clients. This is both a contractual and compliance requirement for us.\n\nBefore we arrange a demo, I need to confirm:\n- Does your platform support multi-tenant client segregation within one warehouse account?\n- Can each client have their own login to view ONLY their inventory and orders?\n- Does your billing module support usage-based invoicing per client (storage volume + pick fees)?\n- How do you handle returns and RMAs for e-commerce clients?\n\nWe had a bad experience with a previous vendor who oversold this capability, so I want to be very direct about our requirements.\n\nNatasha Bourne\nOperations Director\nHarbor Logistics\n(773) 914-2200`,
    date: "2026-03-11T10:05:00Z", read: false, starred: false, label: "inbox"
  },
  {
    id: 9, from: "James Whitford", fromEmail: "jwhitford@tritonfoods.com", avatar: "JW", avatarColor: "#43a047",
    to: "sales@instalily.com", subject: "FEFO Compliance for Perishable Goods",
    snippet: "We deal in perishable food products and need strict FEFO lot management...",
    body: `Hello,\n\nJames Whitford here, Supply Chain Director at Triton Foods — a specialty food distributor operating 4 cold storage warehouses.\n\nRegulatory compliance (FSMA-204) requires that we track all perishable products by lot number and expiration date, and we must follow First-Expiry-First-Out (FEFO) picking rules strictly.\n\nWhat I need to understand before scheduling a demo:\n\n1. Does your WMS enforce FEFO automatically during pick task generation?\n2. Can we configure catch-weight items (items where weight varies per unit)?\n3. Does your system generate lot traceability reports for FDA compliance?\n4. Can we receive alerts when lots are approaching expiration within a configurable window?\n5. Do you have food & beverage customers we can speak to as references?\n\nThis is a compliance-critical decision for us, so we're being very thorough in our evaluation.\n\nThanks,\nJames Whitford\nSupply Chain Director\nTriton Foods Distribution`,
    date: "2026-03-10T08:42:00Z", read: true, starred: false, label: "inbox"
  },
  {
    id: 10, from: "Sandra Cho", fromEmail: "scho@parallelmedia.co", avatar: "SC", avatarColor: "#e91e63",
    to: "sales@instalily.com", subject: "Inventory Management for Media Production Assets",
    snippet: "Our use case is a bit different – we track physical production equipment and props...",
    body: `Hi,\n\nSandra Cho, Head of Operations at Parallel Media. We're a mid-size film and TV production company and our use case might be a bit unconventional for you.\n\nWe manage a large physical inventory of production equipment (cameras, lighting rigs, cables) and set props across 6 storage units. Last month we couldn't find $40,000 worth of Arri lenses when a production needed them.\n\nI'm wondering if InstaLily could work for non-retail inventory. Specifically:\n- Can we tag items by unique asset ID (not just SKU/quantity)?\n- Can we track checkout/check-in for equipment lent to productions?\n- Can we attach photos and condition notes to individual assets?\n- Is there a mobile scan feature so our crew can check in gear on-set?\n\nIf this is within your platform's scope, I'd love a demo.\n\nBest,\nSandra Cho\nHead of Operations\nParallel Media Productions`,
    date: "2026-03-09T15:17:00Z", read: false, starred: false, label: "inbox"
  },
  {
    id: 11, from: "Robert Haines", fromEmail: "rhaines@titanbuildsupply.com", avatar: "RH", avatarColor: "#795548",
    to: "sales@instalily.com", subject: "Replacing Legacy Fishbowl – Looking for Modern Alternative",
    snippet: "We've been on Fishbowl for 8 years and it's time to make a change...",
    body: `Hi InstaLily,\n\nRobert Haines here, VP of Operations at Titan Building Supply. We've been on Fishbowl Inventory for 8 years and while it's served us well, it's become too rigid for our growing complexity.\n\nOur operation: $45M annual revenue, 2 distribution centers, integration with QuickBooks Online, and a growing e-commerce channel through our own website + Amazon.\n\nKey things I need in a replacement:\n1. Native Amazon Seller Central integration\n2. Mobile barcode scanning (iOS preferred — we already have iPads on the floor)\n3. Modern, clean dashboards with KPI tracking\n4. Solid QuickBooks Online sync\n\nIf InstaLily checks these boxes, I'd like to schedule a demo. We're targeting to make a decision by end of Q2.\n\nRobert Haines\nVP of Operations | Titan Building Supply`,
    date: "2026-03-08T13:40:00Z", read: true, starred: false, label: "inbox"
  },
  {
    id: 12, from: "Megan Torres", fromEmail: "mtorres@floraline-wholesale.com", avatar: "MT", avatarColor: "#00acc1",
    to: "sales@instalily.com", subject: "Seasonal Demand Planning – Holiday Floral Inventory",
    snippet: "We're a floral wholesaler and our demand swings dramatically around major holidays...",
    body: `Hi there,\n\nMy name is Megan Torres and I'm the Inventory Planning Manager at Floraline Wholesale — one of the largest floral distributors in the Northeast.\n\nOur inventory challenge is extreme seasonality. Demand spikes 600–900% around Valentine's Day, Mother's Day, and the December holidays. We consistently either over-order (causing massive waste with perishables) or under-order and lose key accounts.\n\nI'm looking for a platform with:\n- Demand forecasting that factors in holiday seasonality and year-over-year trends\n- The ability to set pre-season order targets and track actuals in real time\n- Waste/shrink tracking by product line\n- Supplier order management so we can pre-commit volumes early\n\nWe'd need something up and running before September to be ready for holiday planning.\n\nThank you,\nMegan Torres\nInventory Planning Manager | Floraline Wholesale`,
    date: "2026-03-07T09:55:00Z", read: true, starred: true, label: "inbox"
  },
  {
    id: 13, from: "Kevin Drayton", fromEmail: "k.drayton@alphamotorparts.com", avatar: "KD", avatarColor: "#f4511e",
    to: "sales@instalily.com", subject: "Auto Parts Distribution – VIN-Level Fitment Tracking",
    snippet: "We sell automotive aftermarket parts and need fitment data connected to our stock...",
    body: `Hello,\n\nKevin Drayton, Inventory Director at Alpha Motor Parts. We're a wholesale distributor of aftermarket auto parts serving 350+ independent repair shops.\n\nOur industry has a unique requirement: parts need to be tracked not just by SKU but by vehicle fitment — the Year/Make/Model/Trim that a part is compatible with.\n\nMy questions:\n- Does InstaLily support custom attributes on SKUs (we'd add fitment data via CSV)?\n- Can our sales team search inventory by those custom attributes?\n- Do you have an API so we can sync fitment data from our ACES/PIES data provider?\n- Can we create customer-specific price tiers for our different shop segments?\n\nIf this sounds like a good fit, let's set up a call.\n\nKevin Drayton\nInventory Director | Alpha Motor Parts\n📞 (216) 403-7712`,
    date: "2026-03-06T16:30:00Z", read: false, starred: false, label: "inbox"
  },
  {
    id: 14, from: "Dev Patel", fromEmail: "dev.patel@cosmiqbeauty.com", avatar: "DP", avatarColor: "#880e4f",
    to: "sales@instalily.com", subject: "DTC Brand Scaling Fast – Need Operations Infrastructure",
    snippet: "We went from $2M to $18M in 18 months and our ops are breaking at the seams...",
    body: `Hey team,\n\nDev Patel here, co-founder and COO of Cosmiq Beauty — a DTC skincare brand that's grown from $2M to $18M in annual revenue over the past 18 months.\n\nHonestly, our ops infrastructure hasn't kept up. We're managing everything in Shopify's basic inventory, supplemented by Notion docs. It's held together with duct tape.\n\nWhat I need now:\n1. A source of truth for inventory across Shopify, Amazon, and our 3PL (ShipBob)\n2. Automated reorder alerts before we stock out on hero SKUs\n3. Bill of materials tracking (some products are sold as bundles or kits)\n4. A simple dashboard our non-technical team can use daily\n\nInterested in a demo ASAP — we're in fire-fighting mode and ready to move quickly if the product is right.\n\nDev Patel\nCOO | Cosmiq Beauty\ndev@cosmiqbeauty.com`,
    date: "2026-03-04T21:08:00Z", read: false, starred: true, label: "inbox"
  },
  {
    id: 15, from: "Emily Stanton", fromEmail: "emily.s@peakoutdoorgear.com", avatar: "ES", avatarColor: "#2e7d32",
    to: "sales@instalily.com", subject: "Omnichannel Sync – Retail + E-commerce + Wholesale",
    snippet: "Selling across 4 channels and inventory is never accurate. It's hurting fulfillment...",
    body: `Hi InstaLily,\n\nEmily Stanton, Director of E-commerce at Peak Outdoor Gear. We sell hiking and camping gear across 4 channels: our own Shopify website, Amazon, REI.com (wholesale EDI), and 2 brick-and-mortar retail stores.\n\nThe inventory accuracy problem across these channels is our #1 operational issue. We regularly oversell online because our system doesn't sync fast enough, and we've had Amazon account health penalties as a result.\n\nWhat I'm looking for:\n- Real-time multi-channel inventory sync (Shopify, Amazon, EDI)\n- Channel-specific inventory allocation (e.g., reserve 20% of stock for Amazon)\n- Centralized order management across all channels\n- Backorder and pre-order management\n\nOur tech stack: Shopify Plus, Amazon Seller Central, NetSuite (financials). Any of those integrations available?\n\nEmily Stanton\nDirector of E-commerce | Peak Outdoor Gear`,
    date: "2026-02-28T16:35:00Z", read: true, starred: true, label: "inbox"
  },
  {
    id: 16, from: "Carlos Reyes", fromEmail: "creyes@texcomedical.com", avatar: "CR", avatarColor: "#b71c1c",
    to: "sales@instalily.com", subject: "Medical Device Inventory – UDI and Lot Traceability",
    snippet: "We distribute Class II medical devices and need UDI-compliant inventory tracking...",
    body: `Good afternoon,\n\nCarlos Reyes, Regulatory & Compliance Manager at Texco Medical, a regional distributor of Class II medical devices.\n\nFDA's UDI rule requires us to track all devices by their UDI-DI, lot/batch number, expiration date, and serial number where applicable. We also need to be able to recall specific lots within 24 hours if a safety notice is issued.\n\nQuestions for your team:\n1. Does InstaLily support UDI as a native field, or would we need a custom attribute?\n2. Can we generate a full lot traceability audit trail (received from → sold to)?\n3. How fast can we pull a distribution report for a specific lot if a recall is issued?\n4. Do you have existing medical device distribution customers?\n\nThis is a regulatory compliance requirement, not just a nice-to-have.\n\nCarlos Reyes\nRegulatory & Compliance Manager\nTexco Medical Distribution`,
    date: "2026-02-27T09:12:00Z", read: false, starred: false, label: "inbox"
  },
  {
    id: 17, from: "Hannah Mwangi", fromEmail: "hmwangi@clearskywholesale.com", avatar: "HM", avatarColor: "#006064",
    to: "sales@instalily.com", subject: "Warehouse Slotting Optimization – High-Velocity SKUs",
    snippet: "Our pick rates are too slow because our best-selling SKUs are not optimally placed...",
    body: `Hi,\n\nHannah Mwangi, Warehouse Manager at Clearsky Wholesale. We run a 250,000 sq ft distribution center and we're struggling with pick efficiency.\n\nWe know our problem: our fast-moving SKUs are scattered across the warehouse without any logic. We need to re-slot the warehouse so our highest-velocity items are in the golden zone near packing stations.\n\nDoes InstaLily include any warehouse slotting tools? Specifically:\n- Velocity analysis by SKU (picks per day, units per pick)\n- Heat map or visual layout of the warehouse with slot assignments\n- Suggested re-slotting plans based on velocity data\n- Before/after pick time simulation\n\nIf not as a built-in, do you have an API or data export that would let us feed data into a separate slotting tool?\n\nHannah Mwangi\nWarehouse Manager | Clearsky Wholesale`,
    date: "2026-02-25T13:05:00Z", read: true, starred: false, label: "inbox"
  },
  {
    id: 18, from: "Terrence Blake", fromEmail: "tblake@continentalelectronics.com", avatar: "TB", avatarColor: "#0277bd",
    to: "sales@instalily.com", subject: "Component Inventory for Electronics Manufacturing",
    snippet: "We need BOM explosion, component reservations, and MRO tracking for our fab floor...",
    body: `Hi,\n\nTerrence Blake, Materials Manager at Continental Electronics. We manufacture custom PCBs and electronic assemblies and our component inventory management is a mess.\n\nOur specific pain points:\n1. BOM explosion: given a production order, we need to instantly see if we have all components and in what quantity\n2. Component reservations: once components are reserved for a work order, they shouldn't be available for other orders\n3. MRO inventory: we also track consumables (solder wire, flux, stencils) separately from production components\n4. EOL/obsolescence tracking: alerts when a component we rely on goes end-of-life so we can last-time-buy\n\nWe're currently on a legacy system that will be sunset end of this year. Timeline is tight. Can we schedule a call this week?\n\nTerrence Blake\nMaterials Manager | Continental Electronics\n(714) 882-3309`,
    date: "2026-02-20T08:25:00Z", read: false, starred: false, label: "inbox"
  },
  {
    id: 19, from: "Yusuf Osman", fromEmail: "yosman@goldenstatemfg.com", avatar: "YO", avatarColor: "#f9a825",
    to: "sales@instalily.com", subject: "Production Planning Integration with Inventory",
    snippet: "We need visibility into raw material availability before production orders are released...",
    body: `Hi,\n\nYusuf Osman, Production Planning Manager at Golden State Manufacturing. We make custom metal brackets and enclosures for the electronics industry and run a make-to-order shop.\n\nOur issue: our production planning team releases work orders without clear visibility into whether we have all required raw materials in stock. This causes frequent production stoppages mid-job.\n\nWhat we're looking for:\n- A "material availability check" before a work order is released\n- Bill of materials (BOM) management tied to live inventory quantities\n- Work-in-process (WIP) tracking as materials are consumed on the floor\n- Purchase requisition triggers when materials fall below minimums\n\nDoes InstaLily support manufacturing-side inventory? We're not looking for a full MRP system — just better inventory visibility tied to production BOMs.\n\nYusuf Osman\nProduction Planning Manager | Golden State Mfg.`,
    date: "2026-02-18T11:48:00Z", read: true, starred: false, label: "inbox"
  },
  {
    id: 20, from: "Nolan Chrisp", fromEmail: "nchrisp@arcticbrewing.com", avatar: "NC", avatarColor: "#1b5e20",
    to: "sales@instalily.com", subject: "Craft Brewery Inventory – Raw Materials + Finished Goods",
    snippet: "Running a craft brewery and tracking hops, malt, yeast, plus kegs and cans is complex...",
    body: `Hey,\n\nNolan Chrisp, founder and head brewer at Arctic Brewing Co. — a craft brewery producing about 8,000 barrels per year.\n\nBrewery inventory is surprisingly complex:\n- Raw materials: hops (by variety, harvest year, alpha acid %), malted barley, yeast strains, adjuncts\n- Packaging materials: kegs, cans, crowlers, labels, boxes\n- Work-in-process: beer in fermentation/conditioning tanks (tied to batch/recipe)\n- Finished goods: by SKU across our taproom + distributor accounts\n\nWe also need to handle:\n- Keg tracking — we own 800+ kegs and need to know where they are and flag kegs not returned in 90 days\n- TTB production reporting (mandatory federal reporting)\n- Recipe-level ingredient cost tracking\n\nDo you have any brewery or food/beverage manufacturing clients? Would love to see a demo tailored to our industry.\n\nNolan Chrisp\nFounder & Head Brewer | Arctic Brewing Co.\nnolan@arcticbrewing.com`,
    date: "2026-02-15T19:30:00Z", read: true, starred: false, label: "inbox"
  }
];

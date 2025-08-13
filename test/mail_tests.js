import { Email } from "../server/mail/email.js";
import assert from "assert";

describe("Email Template Tests", () => {
  
  it("should render the download template with standardized data", async () => {
    const testData = {
      data: {
        email: "test@example.com",
        downloads: [
          {
            name: "Test Product 1",
            downloadUrl: "https://example.com/download/product1"
          },
          {
            name: "Test Product 2", 
            downloadUrl: "https://example.com/download/product2"
          }
        ],
        courses: [
          {
            name: "Test Course 1",
            sku: "course-123"
          }
        ]
      }
    };

    const email = new Email({
      template: "download-template",
      email: "test@example.com",
      data: testData
    });
    
    const res = await email.send();
    assert(res);
    assert(res.subject === "Your Download Request");
    assert(res.body.includes("Test Product 1"));
    assert(res.body.includes("Test Product 2"));
    assert(res.body.includes("Test Course 1"));
    console.log("✓ Download template test passed");
  });

  it("should render the AI deadlines template with standardized data", async () => {
    const testData = {
      data: {
        download_url: "https://example.com/download/ai-workshop",
        checkout: {
          number: "12345",
          invoice_url: "https://stripe.com/invoice/12345",
          fulfillment: {
            file: "AI-Workshop-Complete.zip",
            size: "3.6GB",
            download_url: "https://example.com/download/ai-workshop"
          }
        }
      }
    };

    const email = new Email({
      template: "ai-deadlines-personal",
      email: "test@example.com", 
      data: testData
    });
    
    const res = await email.send();
    assert(res);
    assert(res.subject.includes("Order Number: 12345"));
    assert(res.body.includes("AI-Workshop-Complete.zip"));
    assert(res.body.includes("3.6GB"));
    assert(res.body.includes("https://example.com/download/ai-workshop"));
    console.log("✓ AI deadlines template test passed");
  });

  it("should handle empty downloads in download template", async () => {
    const testData = {
      data: {
        email: "test@example.com",
        downloads: [],
        courses: []
      }
    };

    const email = new Email({
      template: "download-template",
      email: "test@example.com",
      data: testData
    });
    
    const res = await email.send();
    assert(res);
    assert(res.body.includes("Unfortunately there don't seem to be any orders"));
    assert(res.body.includes("test@example.com"));
    console.log("✓ Empty downloads test passed");
  });

  it("should handle missing invoice URL in AI deadlines template", async () => {
    const testData = {
      data: {
        download_url: "https://example.com/download/ai-workshop",
        checkout: {
          number: "12345",
          // invoice_url is intentionally missing
          fulfillment: {
            file: "AI-Workshop-Complete.zip",
            size: "3.6GB", 
            download_url: "https://example.com/download/ai-workshop"
          }
        }
      }
    };

    const email = new Email({
      template: "ai-deadlines-personal",
      email: "test@example.com",
      data: testData
    });
    
    const res = await email.send();
    assert(res);
    assert(!res.body.includes("Your Invoice"));
    assert(res.body.includes("AI-Workshop-Complete.zip"));
    console.log("✓ Missing invoice URL test passed");
  });
});
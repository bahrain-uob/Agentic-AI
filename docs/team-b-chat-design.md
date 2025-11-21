# Student Q&A Experience – Journey & UI Sketch

## 1. Persona

- **Name:** Sara, prospective CS student
- **Goal:** understand options for Cloud track
- **Context:** Uses a phone, Arabic language, came from an Instagram ad

## 2. Persona

- **Name:** Ali, working professional
- **Goal:** Understand master's program duration, scheduling, and fees
- **Context:** Uses a laptop, English language, visiting the university website after searching online

## 2. Journey Map (Happy Path)

Describe the main path in ~5–10 steps:

1. Student lands on the EDU-AGENT portal.
2. Logs in (or continues as guest). 
3. Enters a question in the Q&A box.
4. System shows a loading state.
5. System shows an answer + key bullet points.
6. System shows cited sources / “View the catalogue section”.
7. Student clicks through / asks a follow-up question.

A simple table:

| Step | Student Action                 | System Response                         | Notes / Ideas                             |
|------|--------------------------------|-----------------------------------------|-------------------------------------------|
| 1    |  Lands on portal               |  Shows welcome message                  |                                           |
| 2    |  Continues as guest            |  Opens chat window                      |  No login required for Q&A                |
| 3    |  Types a question              |  Starts classification                  |  Quick-action buttons (Smart suggestions) |
| 4    |  Waits                         |  Shows loading state                    |                                           |
| 5    |  Reads answer                  |  Shows an answer                        |  Key bullet points                        |
| 6    |  Check sources                 |  Shows links to official UOB pages     |  View the catalogue section               |
| 7    |  Asks follow-up                |  System maintains context               |                                           |


## 3. Edge Cases / Error States

### No documents found:
- **Message:** "Sorry, I couldn't find any matching documents for your request."
- **Actions:**
  - Try different keywords  
  - Browse available programs  

### Ambiguous question:
- **Message:** "I need more information to provide an accurate answer. Can you please elaborate on your request?"
- **Actions:**
  - Add more details
  - Rephrase the question (Be direct and simple) 
  - Choose from the suggested prompts
  

### System error / timeout:
- **Message:** "Something went wrong. Please try again in a moment."
- **Actions:**
 - Retry  
 - Check connection  
 - Refresh the page
 - Contact support


## 4. Low-Fidelity UI Sketch (Text Description)

### **Layout:**
The chat opens in a clean, minimal interface. 
A welcoming message appears at the top when the student first opens the chat.
The input bar is fixed at the bottom with a text-only input field and a “send” button.
Messages appear in vertical bubbles.

### **Quick-Action buttons (Suggested questions):**
Below the welcome message, the chatbot shows rounded quick-action buttons with common questions
(e.g., “Admission requirements”, “Master’s fees”, “Programme details”).
These help the student start quickly without typing.

### **Citations / Related Links:**
Under each answer, the system can displays small “Related links” (e.g., programme page, fees page, admission requirements).
These links open the official university pages in a new tab.
Citations appear directly under the chatbot’s answer bubble.

### **Filters (Optional, Future addition):**
A simple filter row can be added above the chat, similar to common app filter bars. 

Might include:

	-	Programme level (Undergraduate / Master)
	-	Language (Arabic / English)
	-	Category (Admissions / Fees / Programme Info)

### **Feedback**
After each answer, two reaction icons appear:

👍🏻  
👎🏻  

Students can click on these to indicate whether the response was helpful.
This is optional and does not interrupt the converstion.

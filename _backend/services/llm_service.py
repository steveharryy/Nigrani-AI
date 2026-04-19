import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self):
        api_key = os.environ.get("GEMINI_API_KEY")
        if api_key and "your_" not in api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            self.is_configured = True
        else:
            self.model = None
            self.is_configured = False
            print("Gemini API Key not found in environment variables.")

    async def get_fraud_explanation(self, transaction_data: dict):
        """
        Generates a concise, professional explanation for a fraud detection result.
        """
        if not self.is_configured:
            return "AI Explanation Service is currently unavailable. Please check your API configuration."

        prompt = f"""
        You are a fintech security expert for 'Nigrani AI' UPI Fraud Detection.
        Analyze the following transaction details and provide a concise, human-readable explanation for the risk flagging.
        
        Transaction Info:
        - Amount: ₹{transaction_data.get('amount')}
        - Merchant Category: {transaction_data.get('merchant_category')}
        - Location: {transaction_data.get('location')}
        - Device: {transaction_data.get('device_type')}
        - Risk Level: {transaction_data.get('risk_level')}
        - Confidence Score: {transaction_data.get('confidence_score')}%
        
        Keep the response professional, lowercase (following project style), and under 40 words.
        Focus on the anomalies like high amount, night time, or new device indicators.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Error generating fraud explanation: {e}")
            return "Internal AI engine error while analyzing transaction."

    async def get_chat_response(self, user_query: str, history_context: list, stats_context: dict):
        """
        Provides interactive insights for the security assistant based on historical context.
        """
        if not self.is_configured:
            return "I'm currently unable to access my reasoning engine. Please verify the system credentials."

        # Format context for the LLM
        context_str = f"""
        Current System Stats:
        - Total Transactions: {stats_context.get('total_transactions')}
        - Fraud Rate: {stats_context.get('fraud_rate')}%
        - High Risk Alerts: {stats_context.get('high_risk_alerts')}
        
        Recent Activity Summary (Last 10 items):
        {history_context}
        """

        prompt = f"""
        You are 'Nigrani AI Assistant', a professional UPI security analyst. 
        Answer the user's query based on the following security context:
        
        Context:
        {context_str}
        
        User Query: "{user_query}"
        
        Rules:
        - Keep the tone professional and trustworthy (fintech style).
        - Be concise and lowercase (project aesthetic).
        - If the query is about trends, use the context provided.
        - NEVER make up transaction data not in the context.
        """

        try:
            response = self.model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Error generating chat response: {e}")
            return "I apologized, I encountered an issue while analyzing the security logs."

# Singleton instance
llm_service = LLMService()

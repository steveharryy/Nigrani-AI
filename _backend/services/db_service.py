import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class DBService:
    def __init__(self):
        url: str = os.environ.get("SUPABASE_URL")
        key: str = os.environ.get("SUPABASE_KEY")
        if url and key:
            self.supabase: Client = create_client(url, key)
        else:
            self.supabase = None
            print("Supabase credentials not found in environment variables.")

    def log_transaction(self, data: dict):
        """
        Logs a transaction and its prediction to Supabase.
        """
        if not self.supabase:
            return None
        
        try:
            # Note: Ensure the 'transactions' table exists in Supabase
            response = self.supabase.table("transactions").insert(data).execute()
            return response.data
        except Exception as e:
            print(f"Error logging to Supabase: {e}")
            return None

    def get_history(self, page: int = 1, limit: int = 20):
        """
        Fetches transaction history with pagination.
        """
        if not self.supabase:
            return []
        
        start = (page - 1) * limit
        end = start + limit - 1
        
        try:
            response = self.supabase.table("transactions") \
                .select("*") \
                .order("created_at", desc=True) \
                .range(start, end) \
                .execute()
            return response.data
        except Exception as e:
            print(f"Error fetching history: {e}")
            return []

    def get_alerts(self, limit: int = 50):
        """
        Fetches only high-risk transactions.
        """
        if not self.supabase:
            return []
        
        try:
            response = self.supabase.table("transactions") \
                .select("*") \
                .eq("risk_level", "high") \
                .order("created_at", desc=True) \
                .limit(limit) \
                .execute()
            return response.data
        except Exception as e:
            print(f"Error fetching alerts: {e}")
            return []

    def get_stats(self):
        """
        Calculates dashboard KPI statistics.
        """
        if not self.supabase:
            return {
                "total_transactions": 0,
                "fraud_detected": 0,
                "safe_transactions": 0,
                "fraud_rate": 0,
                "high_risk_alerts": 0
            }
        
        try:
            # Get total count
            all_res = self.supabase.table("transactions").select("*", count="exact").execute()
            total = all_res.count if all_res.count is not None else 0
            
            # Get fraud count
            fraud_res = self.supabase.table("transactions").select("*", count="exact").eq("prediction", "fraud").execute()
            fraud_detected = fraud_res.count if fraud_res.count is not None else 0
            
            # Get high risk count
            alert_res = self.supabase.table("transactions").select("*", count="exact").eq("risk_level", "high").execute()
            high_risk_alerts = alert_res.count if alert_res.count is not None else 0
            
            safe = total - fraud_detected
            rate = round((fraud_detected / total * 100), 2) if total > 0 else 0
            
            return {
                "total_transactions": total,
                "fraud_detected": fraud_detected,
                "safe_transactions": safe,
                "fraud_rate": rate,
                "high_risk_alerts": high_risk_alerts
            }
        except Exception as e:
            print(f"Error calculating stats: {e}")
            return {}

    def get_analytics(self):
        """
        Fetches data for trend and pie charts.
        """
        if not self.supabase:
            return {"trend": [], "distribution": []}
            
        try:
            # Hourly/Daily trend (last 100 for demo)
            response = self.supabase.table("transactions") \
                .select("created_at, prediction, amount") \
                .order("created_at", desc=True) \
                .limit(100) \
                .execute()
            return response.data
        except Exception as e:
            print(f"Error fetching analytics: {e}")
            return []

# Singleton instance
db_service = DBService()

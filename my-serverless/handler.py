import json


def hello(event, context):
    return {
        "message": "hello serverless template I update this sentence"
    }

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """

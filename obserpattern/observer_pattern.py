class Publisher(object):
    def __init__(self):
        self.subscribers = set()

    def register(self, who, callback=None):
        if callback is None:
            callback = getattr(who, 'update')
        self.subscribers[who] = callback

    def unregister(self, who):
        del self.subscribers[who]

    def dispatch(self, message):
        for subscriber, callback in self.subscribers.items():
            # subscriber.update(message)
            callback(message)


class Subscriber(object):
    def __init__(self, name):
        self.name = name

    def update(self, message):
        print("{0} got message \"{1}\"".format(self.name, message))

class SubscriberTwo(object):
    def __init__(self, name):
        self.name = name

    def receive(self, message):
        print('{} got message "{}"'.format(self.name, message))

if __name__ == "__main__":
    pub = Publisher()
    astin = Subscriber('astin')
    james = SubscriberTwo('james')
    jeff = SubscriberTwo('jeff')

    pub.register(astin, astin.update)
    pub.register(james)
    pub.register(jeff)

    pub.dispatch('점심 시간이에요')
    pub.unregister('jeff')
    pub.dispatch('퇴근하세요')
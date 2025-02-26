---
title: 'How i used FastAPI to get roasting profiles for free'
description:
  'Getting a new coffee roaster was an opportunity for me to try a new Python
  framework called FastAPI.'
pubDate: 'Feb 26 2025'
heroImage: 'https://i.ytimg.com/vi/hHoVu5NQe7I/maxresdefault.jpg'
---

I recently acquired a small coffee roaster from
[Sandbox Smart](https://www.sandboxsmart.com), a Taiwanese company. This roaster
works with a mobile app that allows you to control it. There are several ways to
do so, either manually or using profiles. By default, the user has access to
basic roasting profiles, and if they want more advanced profiles, they can gain
access to them through a subscription.

In order to test its functionality, I decided to get a one-month subscription to
access these profiles and see how they were designed. It was an opportunity for
me to try a new Python framework called [FastAPI](https://fastapi.tiangolo.com),
which allows, as its name suggests, to create APIs very quickly.

Using [Charles Proxy](https://www.charlesproxy.com), an HTTP Proxy that enables
a developer to view all of the HTTP and SSL/HTTPS traffic between their machine
and the Internet, I was able to discover the endpoints of Sandbox Smart's REST
API, the parameters to send, and thus create my own wrapper to interact with the
API without using the mobile app.

![Login with email](/signin.png)

In a fairly standard way, you can login using an email and password, which then
allows you to obtain an access_token used for all calls to authenticate the user
and verify their permissions. The API follows the OpenAPI specification model.

![Get profile by id](/profile.png)

What I really liked about FastAPI is that it directly integrates Swagger, which
automatically generates interactive documentation. By running `fastapi run dev`,
you can access the documentation at http://127.0.0.1:8000/docs and quickly
launch API calls.

![Swagger interface](/swagger.png)

FastAPI is based on [Pydantic](https://docs.pydantic.dev/latest/), the data
validation library. This library allows you to create data models and simply
ensure their compliance, and typing your schemas is child's play! Here's an
example of schema that Pydantic validates against.

```python
class DataPoint(BaseModel):
    doorAngle: int
    continuousTime: int = Field(ge=0)
    timeline: int
    heatPower: int = Field(100, ge=0, le=100)
    temperature: Optional[int] = Field(0, ge=0, le=250)
    fanSpeed: int = Field(100, ge=0, le=100)
    drumSpeed: int = Field(100, ge=0, le=100)
```

My goal was to find a way to retrieve and export my roasting data but
unfortunately i found the functionalities to be quite limited. For those of you
who are curious, the whole code can be found here :
[https://github.com/jzarca01/pysandboxsmart](https://github.com/jzarca01/pysandboxsmart)

Thank you for reading, and if you enjoyed this article, feel free to share it on
social media.

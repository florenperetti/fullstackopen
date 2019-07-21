const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogHelper = require('../utils/blog_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = blogHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(6)
})

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a blog can be added ', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 15,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    expect(response.body.length).toBe(blogHelper.initialBlogs.length + 1)
    expect(title).toContain("Type wars")
})

test('missing likes defaults to zero', async () => {
    const newBlog = {
        title: "Type wars 2",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const likes = response.body[response.body.length - 1].likes
  
    expect(likes).toBe(0)
})

test('blog with missing title and url is not added', async () => {
    const newBlog = {
        author: "Robert C. Martin",
        likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      
    const { body } = await api.get('/api/blogs')
    expect(body.length).toBe(blogHelper.initialBlogs.length)
})

test('delete returns one less blog', async () => {
    const response = await api.get('/api/blogs')

    const initialLength = response.body.length
    const lastId = response.body[initialLength - 1].id

    await api
            .delete(`/api/blogs/${lastId}`)
            .expect(204)
    
    const response2 = await api.get('/api/blogs')
    expect(response2.body.length).toBe(initialLength - 1)
})

test('updating last blog likes returns those likes', async () => {
    const { body } = await api.get('/api/blogs')
    const initialLength = body.length
    const { id, likes } = body[initialLength - 1]
    const finalLikes = Number(likes) + 10

    const putResponse = await api
                                .put(`/api/blogs/${id}`)
                                .send({ likes: finalLikes })
                                .expect(200)
                                .expect('Content-Type', /application\/json/)
                            
    const updatedBlog = putResponse.body
    
    expect(updatedBlog.likes).toBe(finalLikes)
})

afterAll(() => {
    mongoose.connection.close()
})
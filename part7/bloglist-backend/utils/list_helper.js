const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => acc += curr.likes, 0)
}

const favoriteBlog = (blogs) => {
    const result = blogs.reduce((acc, curr) => {
        if (acc.likes <= curr.likes) {
            const { title, author, likes } = curr
            acc = { title, author, likes }
        }
        return acc
    }, { likes: 0 })

    if (!result.title && result.likes === 0) {
        return null
    }

    return result
}


const mostBlogs = (blogs) => {
    const result = blogs.reduce((acc, curr) => {
        if (!acc[curr.author]) {
            acc[curr.author] = { author: curr.author, blogs: 1 }
        } else {
            acc[curr.author].blogs += 1
        }

        if (!acc.max.author) {
            acc.max = { author: curr.author, blogs: 1 }
        } else if (acc[curr.author].blogs >= acc.max.blogs) {
            acc.max = acc[curr.author]
        }
        return acc
    }, { max: {} })

    return !result.max.author ? null : result.max
}

const mostLikes = (blogs) => {
    const result = blogs.reduce((acc, curr) => {
        if (!acc[curr.author]) {
            acc[curr.author] = { author: curr.author, likes: curr.likes }
        } else {
            acc[curr.author].likes += curr.likes
        }

        if (!acc.max.author) {
            acc.max = { author: curr.author, likes: curr.likes }
        } else if (acc[curr.author].likes >= acc.max.likes) {
            acc.max = acc[curr.author]
        }
        return acc
    }, { max: {} })

    return !result.max.author ? null : result.max
}

module.exports = {
    dummy,
    favoriteBlog,
    mostLikes,
    mostBlogs,
    totalLikes
}
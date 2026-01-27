export class EditedArticleBuilder {
  withTitle(title) {
    this.title = title;
    return this;
  }

  withDescription(description) {
    this.description = description;
    return this;
  }

  withBody(body) {
    this.body = body;
    return this;
  }

  // сейчас не используется, так как при редактировании тэги удаляются - в этом кстати нашелся баг. По факту они не удаляются.
  withTags(tags) {
    this.tags = tags ?? [];
    return this;
  }

  build() {
    return {
      title: this.title,
      description: this.description,
      body: this.body,
      tags: this.tags ?? []
    };
  }
}

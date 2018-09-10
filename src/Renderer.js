class Renderer {
    renderTemplate(templateId, info) {
        let template = $('#'+templateId).text();

        for(let key in info) {
            template = template.replace(new RegExp('{'+key+'}', 'g'), info[key]);
        }
        return template;
    }
}

export default Renderer;
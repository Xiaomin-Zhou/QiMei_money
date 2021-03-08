import tagListModel from "@/models/tagListModel";

export default{
    //tag store
    tagList: tagListModel.fetch(),
  
    findTag(id: string){
      return  this.tagList.filter(t => t.id === id)[0];
    },
  
    createTag: (name: string)=>{
  
      const message = tagListModel.create(name)
      if(message ==='duplicated'){
        window.alert('标签名重复')
      }else if(message ==='success'){
        window.alert('添加成功')
      }
    },
  
    removeTag: (id: string) =>{
        return tagListModel.remove(id) //简化：因为remove的类型就是布尔
    },
  
    updateTag: (id: string, name: string)=>{
      return tagListModel.update(id, name)
  
    }
}
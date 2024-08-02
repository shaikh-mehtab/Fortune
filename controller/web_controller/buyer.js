
const connection = require("../../connection");

const getAllbuyer = async (req, res) => {

    try {
        const [buyer] = await connection.query(`select * from web_faqs where status=1`);
        const [buyer_faq] = await connection.query(`select * from buyer_guide where status=1`);
       

        const page = {
            title: buyer[0].title,
            meta_title: buyer[0].meta_title,
            meta_desc: buyer[0].meta_description,
          };
  
        res.render("buyer", { page: page, buyer: buyer, buyer_faq : buyer_faq });}
        catch (error) {
        res.status(500).render("500",{
            message : error.message
        })

    }

}
module.exports ={
    getAllbuyer   
}

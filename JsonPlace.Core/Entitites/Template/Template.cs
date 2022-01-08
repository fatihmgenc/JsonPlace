namespace JsonPlace.Core.Entitites.Template
{
    public  class Template : BaseEntity
    {
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IEnumerable<PropType> PropTypes;
    }
}

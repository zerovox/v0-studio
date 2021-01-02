/**
 * const shareExtractor = extract`https://workflowy.com/s/${'shareName'}/${'shareId'}`;
 * const { shareId } = shareExtractor("https://workflowy.com/s/inspiration/7Jls9gnBqM21Tp6h");
 */
export default function extract<K extends keyof any>(
  template: TemplateStringsArray,
  ...keys: Array<K>
): (arg: string) => { [P in K]: string } {
  return (arg: string) => {
    if (keys.length !== template.length - 1) {
      throw new Error("Template strings should have one more segment than holes");
    }

    let remainder = arg;
    const parts: { [P in K]: string } = {} as { [P in K]: string };
    for (let i = 0; i < keys.length; i++) {
      const templateSegment = template[i];
      const nextTemplateSegment = template[i + 1];
      if (!remainder.startsWith(templateSegment)) {
        throw new Error("Failed to match template");
      }

      const nextSegmentIndex = remainder.indexOf(nextTemplateSegment, templateSegment.length);
      parts[keys[i]] = remainder.slice(
        templateSegment.length,
        nextTemplateSegment === "" ? undefined : nextSegmentIndex
      );
      remainder = remainder.slice(nextSegmentIndex);
    }
    return parts;
  };
}

# FragInvocationCountEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FragInvocationCountEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FragInvocationCountEXT - Number of fragment shader invocations for a fragment

`FragInvocationCountEXT`

Decorating a variable with the `FragInvocationCountEXT` built-in
decoration will make that variable contain the maximum number of fragment
shader invocations for the fragment, as determined by
`minSampleShading`.

If [Sample Shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is not enabled,
`FragInvocationCountEXT` will be filled with a value of 1.

Valid Usage

* 
[](#VUID-FragInvocationCountEXT-FragInvocationCountEXT-04217) VUID-FragInvocationCountEXT-FragInvocationCountEXT-04217

The `FragInvocationCountEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragInvocationCountEXT-FragInvocationCountEXT-04218) VUID-FragInvocationCountEXT-FragInvocationCountEXT-04218

The variable decorated with `FragInvocationCountEXT` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-FragInvocationCountEXT-FragInvocationCountEXT-04219) VUID-FragInvocationCountEXT-FragInvocationCountEXT-04219

The variable decorated with `FragInvocationCountEXT` **must** be
declared as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.

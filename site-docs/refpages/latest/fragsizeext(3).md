# FragSizeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FragSizeEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FragSizeEXT - Size of the screen-space area covered by the fragment

`FragSizeEXT`

Decorating a variable with the `FragSizeEXT` built-in decoration will
make that variable contain the dimensions in pixels of the
[area](../../../../spec/latest/appendices/glossary.html#glossary-fragment-area) that the fragment covers for that
invocation.

|  | When used in a custom resolve operation and the [`customResolve`](../../../../spec/latest/chapters/features.html#features-customResolve) feature is enabled, the dimensions in pixels returned
| --- | --- |
**may** be (1,1) if the fragment area was reduced. |

If fragment density map is not enabled, `FragSizeEXT` will be filled with
a value of (1,1).

Valid Usage

* 
[](#VUID-FragSizeEXT-FragSizeEXT-04220) VUID-FragSizeEXT-FragSizeEXT-04220

The `FragSizeEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragSizeEXT-FragSizeEXT-04221) VUID-FragSizeEXT-FragSizeEXT-04221

The variable decorated with `FragSizeEXT` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-FragSizeEXT-FragSizeEXT-04222) VUID-FragSizeEXT-FragSizeEXT-04222

The variable decorated with `FragSizeEXT` **must** be declared as a
two-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.

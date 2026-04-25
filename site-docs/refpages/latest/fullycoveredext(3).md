# FullyCoveredEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FullyCoveredEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FullyCoveredEXT - Indication of whether a fragment is fully covered

`FullyCoveredEXT`

Decorating a variable with the `FullyCoveredEXT` built-in decoration will
make that variable indicate whether the [fragment area](../../../../spec/latest/appendices/glossary.html#glossary-fragment-area) is fully covered by the generating primitive.
This variable is non-zero if conservative rasterization is enabled and the
current fragment area is fully covered by the generating primitive, and is
zero if the fragment is not covered or partially covered, or conservative
rasterization is disabled.

Valid Usage

* 
[](#VUID-FullyCoveredEXT-FullyCoveredEXT-04232) VUID-FullyCoveredEXT-FullyCoveredEXT-04232

The `FullyCoveredEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FullyCoveredEXT-FullyCoveredEXT-04233) VUID-FullyCoveredEXT-FullyCoveredEXT-04233

The variable decorated with `FullyCoveredEXT` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-FullyCoveredEXT-FullyCoveredEXT-04234) VUID-FullyCoveredEXT-FullyCoveredEXT-04234

The variable decorated with `FullyCoveredEXT` **must** be declared as a
boolean value

* 
[](#VUID-FullyCoveredEXT-conservativeRasterizationPostDepthCoverage-04235) VUID-FullyCoveredEXT-conservativeRasterizationPostDepthCoverage-04235

If
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`conservativeRasterizationPostDepthCoverage`
is not supported the `PostDepthCoverage` `Execution` `Mode` **must** not be
declared, when a variable with the `FullyCoveredEXT` decoration is
declared

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.

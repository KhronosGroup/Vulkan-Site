# Introduction

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/introduction.html

## Table of Contents

- [Document Conventions](#introduction-conventions)
- [Normative Requirements](#introduction-normative-requirements)
- [Normative Terminology](#introduction-normative-terminology)
- [Normative Descriptions](#introduction-normative-descriptions)
- [Normative References](#introduction-normative-references)
- [Informative Language](#introduction-informative-language)
- [Technical Terminology](#introduction-technical-terminology)
- [Ratification](#introduction-ratified)

## Content

This document, referred to as the
“Vulkan Specification” or just the “Specification” hereafter, describes
the Vulkan
Application Programming Interface (API).
Vulkan is a [C99](http://www.open-std.org/jtc1/sc22/wg14/www/standards) API
designed for explicit control of low-level graphics and compute
functionality.

The canonical version of the Specification is available in the official
[Vulkan Registry](https://registry.khronos.org/vulkan/)
([https://registry.khronos.org/vulkan/](https://registry.khronos.org/vulkan/)).
The source files used to generate the Vulkan specification are stored in the
[Vulkan Documentation Repository](https://github.com/KhronosGroup/Vulkan-Docs)
([https://github.com/KhronosGroup/Vulkan-Docs](https://github.com/KhronosGroup/Vulkan-Docs)).

The source repository additionally has a public issue tracker and allows the
submission of pull requests that improve the specification.

The Vulkan specification is intended for use by both implementors of the API
and application developers seeking to make use of the API, forming a
contract between these parties.
Specification text may address either party; typically the intended audience
can be inferred from context, though some sections are defined to address
only one of these parties.
(For example, [Valid Usage](fundamentals.html#fundamentals-validusage) sections only address
application developers).
Any requirements, prohibitions, recommendations, or options defined in
specification text are imposed only on the audience of that text.

The Vulkan Specification uses a combination of
[normative terminology](#introduction-normative-terminology) and
[normative descriptions](#introduction-normative-descriptions) to express
the requirements that it imposes on applications and implementations.
An application which complies with all normative requirements imposed on
applications is said to make **valid use** of the API; failing to comply with
such requirements results in **undefined** behavior, as discussed in the
[Valid Usage](fundamentals.html#fundamentals-validusage) section below.
In the context of this document, an implementation which complies with all
normative requirements imposed on implementations is said to be
**conformant**.

|  | The Khronos Group imposes additional requirements on implementors who wish
| --- | --- |
to make public statements describing their Vulkan implementations as
conformant.
These include signing the Vulkan Adopter’s Agreement, paying the associated
fee, and making a successful conformance test submission to the Khronos
Conformance Process.
For details see the
[Khronos Trademark
Guidelines](https://www.khronos.org/legal/khronos-trademark-guidelines) ([https://www.khronos.org/legal/khronos-trademark-guidelines](https://www.khronos.org/legal/khronos-trademark-guidelines)). |

Within this specification, the key words **must**, **required**, **should**, **may**,
and **optional** are to be interpreted as described in
[RFC 2119 - Key words for use in RFCs to
Indicate Requirement Levels](https://www.ietf.org/rfc/rfc2119.txt) ([https://www.ietf.org/rfc/rfc2119.txt](https://www.ietf.org/rfc/rfc2119.txt)).
The additional key word **optionally** is an alternate form of **optional**, for
use where grammatically appropriate.
These key words are highlighted in the specification to indicate that they
are being used in a specific technical sense.

The additional key words **can** and **cannot** are to be interpreted as
describing the capabilities of an application, as follows:

can

This word means that the application is able to perform the action
described.

cannot

This word means that the API and/or the execution environment provide no
mechanism through which the application can express or accomplish the action
described.

These key words are never used in text addressing implementors.

|  | There is an important distinction between **cannot** and **must not**, as used
| --- | --- |
in this Specification.
**Cannot** refers to something the API provides no way for the application to
express or accomplish.
**Must not** describes something that the application is able to express, but
that is not valid use of the API, and will have **undefined** and potentially
unrecoverable consequences. |

In the Vulkan Specification, the normative term **must** is primarily used to
describe **application** behavior, and in particular to constrain what inputs
or commands issued by the application to the implementation are considered
valid.

To constrain **implementation** behavior, the specification sometimes uses
**must**, but more often simply describes the behavior of the implementation in
response to specified commands and inputs.
Unless explicitly stated otherwise, such references to implementation
behavior describe the behavior of **conformant** implementations, and express
normative requirements which an implementation must satisfy in order to
conform to the specification.
For example, if the specification says “Under **specified condition**, the
error code [VK_ERROR_FEATURE_NOT_PRESENT](fundamentals.html#VkResult) is returned”, that behavior
is a requirement of the specification, and an implementation which does not
return that error code under that condition is not conformant.

When the normative terms **may**, **should**, or **optional** are used to describe
implementation behavior, they define alternative or optional behaviors which
a conformant implementation may or may not exhibit.
Such statements are also normative.
For example, if the specification says “Under **specified condition**, the
implementation **should** return A but **may** instead return B”, then an
implementation that returns either A or B under that condition is conformant
(assuming it does not violate other normative requirements), while an
implementation that returns anything else is not.

References to external documents are considered normative references if the
Specification uses [normative terminology](#introduction-normative-terminology) or [normative descriptions](#introduction-normative-descriptions) to refer to them or their requirements, either as a whole or
in part.

The following documents are referenced by normative sections of the
specification:

IEEE.
August, 2008.
*IEEE Standard for Floating-Point Arithmetic*.
IEEE Std 754-2008.
[https://dx.doi.org/10.1109/IEEESTD.2008.4610935](https://dx.doi.org/10.1109/IEEESTD.2008.4610935) .

 Andrew Garrard.
*Khronos Data Format Specification, version 1.3*.
[https://registry.khronos.org/DataFormat/specs/1.3/dataformat.1.3.html](https://registry.khronos.org/DataFormat/specs/1.3/dataformat.1.3.html) .

 John Kessenich.
*SPIR-V Extended Instructions for GLSL, Version 1.00* (February 10, 2016).
[https://registry.khronos.org/spir-v/](https://registry.khronos.org/spir-v/) .

 John Kessenich, Boaz Ouriel, Raun Krisch, and Diego Novillo.
*SPIR-V Specification, Version 1.6.7, Revision 1, Unified* (March, 2026).
[https://registry.khronos.org/spir-v/](https://registry.khronos.org/spir-v/) .

ITU-T.
*H.264 Advanced Video Coding for Generic Audiovisual Services* (August,
2021).
[https://www.itu.int/rec/T-REC-H.264-202108-I/](https://www.itu.int/rec/T-REC-H.264-202108-I/) .

ITU-T.
*H.265 High Efficiency Video Coding* (August, 2021).
[https://www.itu.int/rec/T-REC-H.265-202108-S/](https://www.itu.int/rec/T-REC-H.265-202108-S/) .

Google.
*VP9 Bitstream & Decoding Process Specification* (February 22, 2017).
[https://storage.googleapis.com/downloads.webmproject.org/docs/vp9/vp9-bitstream-specification-v0.7-20170222-draft.pdf](https://storage.googleapis.com/downloads.webmproject.org/docs/vp9/vp9-bitstream-specification-v0.7-20170222-draft.pdf) .

Alliance for Open Media.
*AV1 Bitstream & Decoding Process Specification* (January 8, 2019).
[https://aomediacodec.github.io/av1-spec/av1-spec.pdf](https://aomediacodec.github.io/av1-spec/av1-spec.pdf) .

 Jon Leech.
*The Khronos Vulkan API Registry* (February 26, 2023).
[https://registry.khronos.org/vulkan/specs/latest/registry.html](https://registry.khronos.org/vulkan/specs/latest/registry.html) .

 Jon Leech and Tobias Hector.
*Vulkan Documentation and Extensions: Procedures and Conventions* (February
26, 2023).
[https://registry.khronos.org/vulkan/specs/latest/styleguide.html](https://registry.khronos.org/vulkan/specs/latest/styleguide.html) .

*Architecture of the Vulkan Loader Interfaces* (October, 2021).
[https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderInterfaceArchitecture.md](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderInterfaceArchitecture.md)
.

Some language in the specification is purely informative, intended to
provide background information or make suggestions to implementors or
developers.
Such language does not impose normative requirements on implementations or
applications.

All NOTEs are implicitly informative.

If an entire chapter, section, or appendix contains only informative
language, its title will be suffixed with “(Informative)”.
Unless so noted in the title, all chapters, sections, and appendices in this
document are normative.

The Vulkan Specification makes use of common engineering and graphics terms
such as **Pipeline**, **Shader**, and **Host** to identify and describe Vulkan API
constructs and their attributes, states, and behaviors.
The [Glossary](../appendices/glossary.html#glossary) defines the basic meanings of these terms in the
context of the Specification.
The Specification text provides fuller definitions of the terms and may
elaborate, extend, or clarify the [Glossary](../appendices/glossary.html#glossary) definitions.
When a term defined in the [Glossary](../appendices/glossary.html#glossary) is used in normative
language within the Specification, the definitions within the Specification
govern and supersede any meanings the terms may have in other technical
contexts (i.e. outside the Specification).

*Ratification* of a Vulkan core version or extension is a status conferred
by vote of the Khronos Board of Promoters, bringing that core version or
extension under the umbrella of the Khronos IP Rights Policy.

All Vulkan core versions and `KHR` extensions (including provisional
specifications) are ratified, as are some multi-vendor `EXT` extensions.
Ratification status of extensions is described in the [Layers & Extensions (Informative)](../appendices/extensions.html#extensions) appendix.

|  | Ratification status is primarily of interest to IHVs developing GPU hardware
| --- | --- |
and Vulkan implementations.
For developers, ratification does not necessarily mean that an extension is
“better”, has a more stable API, or is more widely supported than
alternative ways of achieving that functionality.

Interactions between ratified and non-ratified extensions are not themselves
ratified. |

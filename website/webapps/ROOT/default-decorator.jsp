<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<%@ taglib uri="sitemesh-decorator" prefix="decorator" %>
<%@ taglib uri="sitemesh-page" prefix="page" %>
<HTML>
<HEAD>
	<title><decorator:title /></title>
	<META http-equiv=Content-Type content="text/html; charset=windows-1252">
	<LINK href="index_files/selenium.css" type=text/css rel=stylesheet>
	<META <decorator:head />
</HEAD>
<BODY>
<DIV class=header>
	<table width="96%" border="0" cellpadding="0" cellspacing="0">
		<tr>
 			<td><IMG ALT="Selenium" SRC="index_files/selenium3.jpg"></td><td align="right"><a href="http://www.thoughtworks.com"><img src="index_files/Logo_trans_white.gif" width="190" height="40" border="0" alt="ThoughtWorks Logo"/></a></td>
		</tr>
	</table>
</DIV>
<DIV class=container>&nbsp;
	<table width="96%" border="0" cellpadding="0" cellspacing="0">
		<tr>
 			<td class="smalltext" align="right"><img src="index_files/icon_printer.gif" border="0" alt="Printer"/>&nbsp<a href="<%= request.getRequestURI() %>?printable=true">Printer friendly form of this page</a>
		</tr>
	</table>
	<DIV id=menu>
	<UL id=menulist>
  		<LI><A href="index.html">home</A>
  		<LI><A href="download.html">download</A>
  		<LI><A href="seleniumReference.html">reference</A>
  		<LI><A href="FAQ.html">faq</A>
  		<LI><A href="contact.html">contact</A>
  		<LI><A href="demos.html">demos</A>
  		</LI></UL></DIV>
	<DIV class="content">
		<font class="pagetitle"><decorator:title /></font>
		<h6 class="pagetitle"></h6>
		<p>
		<decorator:body />
	</DIV>
	<br>
	<DIV class="smalltext">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<hr>
			<tr>
 				<td align="center" valign="center"> &copy;2004 <a href="http://www.thoughtworks.com">ThoughtWorks, Inc.</a></td>
			</tr>
		</table>
	</DIV>
</DIV>
</BODY>
</HTML>


